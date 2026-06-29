/**
 * generate-data.js
 *
 * Reads data.json and rewrites the data section of src/App.jsx.
 * Run manually or automatically via GitHub Actions on every push.
 *
 * Usage:
 *   node generate-data.js
 */

import fs from "fs";
import path from "path";

const DATA_PATH = path.resolve("data.json");
const APP_PATH  = path.resolve("src/App.jsx");

if (!fs.existsSync(DATA_PATH)) {
  console.error("❌  data.json not found in repo root.");
  process.exit(1);
}

// ── slug helper (must stay in sync with App.jsx) ─────────────────────────────
function toId(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

// ── main ─────────────────────────────────────────────────────────────────────
const raw = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));

const { devices, indications, contraindications, deviceProfiles } = raw;

// ── build indications array ──────────────────────────────────────────────────
const indicationsOut = indications
  .sort((a, b) => a.label.localeCompare(b.label))
  .map(({ label, devices: devs }) => ({
    id: toId(label),
    label,
    devices: [...devs].sort(),
  }));

// ── build contraindications array ────────────────────────────────────────────
const contraindicationsOut = contraindications
  .sort((a, b) => a.label.localeCompare(b.label))
  .map(({ label }) => ({ id: toId(label), label }));

// ── build deviceProfiles object (convert labels → ids) ───────────────────────
const labelToId = Object.fromEntries(contraindicationsOut.map(c => [c.label, c.id]));

const deviceProfilesOut = {};
for (const dev of devices) {
  const profile = deviceProfiles[dev.name] || { absoluteContra: [], cautionaryContra: [] };
  deviceProfilesOut[dev.name] = {
    absoluteContra:   profile.absoluteContra.map(l => labelToId[l] ?? toId(l)),
    cautionaryContra: profile.cautionaryContra.map(l => labelToId[l] ?? toId(l)),
    description:      dev.description || "TBD",
    ...(dev.details ? { details: dev.details } : {}),
  };
}

// ── serialise to JS source ────────────────────────────────────────────────────
const deviceProfilesCode =
  "{\n" +
  Object.entries(deviceProfilesOut)
    .map(([name, p]) =>
      `  ${JSON.stringify(name)}: ` +
      JSON.stringify(p, null, 2).split("\n").join("\n  ")
    )
    .join(",\n") +
  "\n}";

const dataBlock =
`// ─── AUTO-GENERATED – do not edit by hand ────────────────────────────────
// Last generated: ${new Date().toISOString()}
// Source: data.json

const indications = ${JSON.stringify(indicationsOut, null, 2)};

const contraindications = ${JSON.stringify(contraindicationsOut, null, 2)};

const deviceProfiles = ${deviceProfilesCode};
// ─── END AUTO-GENERATED ───────────────────────────────────────────────────`;

// ── splice into App.jsx ───────────────────────────────────────────────────────
const original = fs.readFileSync(APP_PATH, "utf8");

const START_MARKER = "// ─── AUTO-GENERATED – do not edit by hand";
const END_MARKER   = "// ─── END AUTO-GENERATED";

let updated;
if (original.includes(START_MARKER)) {
  const start = original.indexOf(START_MARKER);
  const end   = original.indexOf(END_MARKER) + END_MARKER.length;
  updated = original.slice(0, start) + dataBlock + original.slice(end);
} else {
  // first run – replace the three const declarations that exist in the original file
  const firstConst = original.indexOf("const indications");
  const lastConst  = original.lastIndexOf("const deviceProfiles");
  const afterLast  = original.indexOf("\n};", lastConst) + 3;
  updated = original.slice(0, firstConst) + dataBlock + "\n" + original.slice(afterLast);
}

fs.writeFileSync(APP_PATH, updated, "utf8");

console.log("✅  src/App.jsx updated successfully.");
console.log(`   Indications:       ${indicationsOut.length}`);
console.log(`   Contraindications: ${contraindicationsOut.length}`);
console.log(`   Devices:           ${devices.length}`);
