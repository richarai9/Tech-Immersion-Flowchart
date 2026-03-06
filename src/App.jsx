import { useMemo, useState } from "react";

const indications = [
  {
    id: "ambulation_goals",
    label: "Ambulation Goals",
    devices: [
      "Biomotum",
      "C-Brace",
      "Cadence Shoe",
      "Ekso GT/NR",
      "Hypershell X",
      "Idego by Ekso",
      "Powered Knee Ankle Foot Orthosis",
      "ReWalk Restore",
      "ReWalk by Lifeward",
      "WIM",
      "Zeen",
    ],
  },
  {
    id: "balance",
    label: "Balance",
    devices: ["ARWell Pro", "BalanceBelt", "Kinesix VR"],
  },
  {
    id: "bladder_control",
    label: "Bladder Control",
    devices: ["Functional Electrical Stimulation"],
  },
  {
    id: "cognition",
    label: "Cognition",
    devices: ["ARWell Pro", "Kinesix VR", "Transcutaneous Vagal Nerve Stimulation"],
  },
  {
    id: "coordination",
    label: "Coordination",
    devices: ["ARWell Pro", "Kinesix VR"],
  },
  {
    id: "distal_weakness",
    label: "Distal Weakness",
    devices: ["Biomotum", "Cadence Shoe", "ReWalk Restore"],
  },
  {
    id: "endurance",
    label: "Endurance",
    devices: [
      "C-Brace",
      "Ekso GT/NR",
      "Idego by Ekso",
      "Powered Knee Ankle Foot Orthosis",
      "ReWalk by Lifeward",
      "Zeen",
    ],
  },
  {
    id: "gait_analysis",
    label: "Gait Analysis",
    devices: ["Magnes Nushu"],
  },
  {
    id: "hypertonia",
    label: "Hypertonia",
    devices: ["Functional Electrical Stimulation", "Ottobock Exopulse Suit"],
  },
  {
    id: "mood_and_emotional_regulation",
    label: "Mood and Emotional Regulation",
    devices: ["Transcutaneous Vagal Nerve Stimulation"],
  },
  {
    id: "neuromodulation",
    label: "Neuromodulation",
    devices: [
      "AIH (Intermittent Hypoxia)",
      "BrainQ Technologies BQ3.0",
      "Transcutaneous Spinal Cord Stimulation",
      "Transcutaneous Vagal Nerve Stimulation",
    ],
  },
  {
    id: "pain",
    label: "Pain",
    devices: [
      "Functional Electrical Stimulation",
      "Ottobock Exopulse Suit",
      "Transcutaneous Vagal Nerve Stimulation",
    ],
  },
  {
    id: "pediatrics",
    label: "Pediatrics",
    devices: ["ARWell Pro", "Kinesix VR"],
  },
  {
    id: "proprioception",
    label: "Proprioception",
    devices: ["BalanceBelt", "Magnes Nushu"],
  },
  {
    id: "proximal_weakness",
    label: "Proximal Weakness",
    devices: ["Hypershell X", "WIM"],
  },
  {
    id: "speech",
    label: "Speech",
    devices: ["Transcutaneous Vagal Nerve Stimulation"],
  },
  {
    id: "strengthening",
    label: "Strengthening",
    devices: [
      "Biomotum",
      "C-Brace",
      "Cadence Shoe",
      "Ekso GT/NR",
      "Functional Electrical Stimulation",
      "Hypershell X",
      "Idego by Ekso",
      "Powered Knee Ankle Foot Orthosis",
      "ReWalk Restore",
      "ReWalk by Lifeward",
      "WIM",
      "Zeen",
    ],
  },
  {
    id: "upper_extremity",
    label: "Upper Extremity",
    devices: ["Barrett Upper-Extremity Robot Trainer (BURT)", "Gloreha Sinfonia"],
  },
  {
    id: "upright_tolerance",
    label: "Upright Tolerance",
    devices: ["Ekso GT/NR", "Idego by Ekso", "ReWalk by Lifeward"],
  },
  {
    id: "vestibular",
    label: "Vestibular",
    devices: ["ARWell Pro", "BalanceBelt", "Kinesix VR"],
  },
];

const contraindications = [
  { id: "absent_trunk_control", label: "Absent Trunk Control" },
  { id: "autonomic_instability", label: "Autonomic Instability" },
  { id: "cancer", label: "Cancer" },
  { id: "cardiac_conditions", label: "Cardiac Conditions" },
  { id: "cardiopulmonary_disease", label: "Cardiopulmonary Disease" },
  { id: "cognitive_impairment", label: "Cognitive Impairment" },
  { id: "contractures", label: "Contractures" },
  { id: "craniectomy", label: "Craniectomy" },
  { id: "dvt", label: "DVT" },
  { id: "hypertonicity", label: "Hypertonicity" },
  { id: "hypertonicity_mas_gt_3", label: "Hypertonicity, MAS > 3" },
  { id: "hypoxic_brain_injury", label: "Hypoxic Brain Injury" },
  { id: "implanted_electronic_devices", label: "Implanted Electronic Devices" },
  { id: "infectious_disease_fever", label: "Infectious Disease / Fever" },
  { id: "leg_length_discrepancy", label: "Leg Length Discrepancy" },
  { id: "metal_implants", label: "Metal Implants" },
  { id: "open_wounds", label: "Open Wounds" },
  { id: "osteoporosis", label: "Osteoporosis" },
  { id: "pain", label: "Pain" },
  { id: "peripheral_neuropathy", label: "Peripheral Neuropathy" },
  { id: "pregnancy", label: "Pregnancy" },
  { id: "rashes_skin_disease", label: "Rashes or Skin Disease" },
  { id: "seizure_disorder", label: "Seizure Disorder" },
  { id: "seizures", label: "Seizures" },
  { id: "severe_cognitive_impairment", label: "Severe Cognitive Impairment" },
  { id: "significant_leg_length_discrepancy", label: "Significant Leg Length Discrepancy" },
  { id: "skin_infection", label: "Skin Infection" },
  { id: "sleep_apnea", label: "Sleep Apnea" },
  { id: "stroke", label: "Stroke" },
  { id: "tbi", label: "TBI" },
  { id: "uncontrolled_hypertension", label: "Uncontrolled Hypertension" },
  { id: "uncontrolled_seizures", label: "Uncontrolled Seizures" },
  { id: "urethane_allergy", label: "Urethane Allergy" },
  { id: "ventilator_life_support", label: "Ventilator / Electronic Life Support Devices" },
  { id: "vision_impairment", label: "Vision Impairment" },
  { id: "weight_gt_220lbs", label: "Weight > 220 lbs" },
  { id: "weight_gt_250lbs", label: "Weight > 250 lbs" },
  { id: "weight_gt_275lbs", label: "Weight > 275 lbs" },
];

const deviceProfiles = {
  "AIH (Intermittent Hypoxia)": {
    absoluteContra: ["cardiopulmonary_disease", "hypoxic_brain_injury"],
    cautionaryContra: [
      "autonomic_instability",
      "cancer",
      "cardiac_conditions",
      "sleep_apnea",
      "stroke",
      "tbi",
      "uncontrolled_hypertension",
    ],
    description:
      "Intermittent hypoxia delivered to enhance respiratory and possibly neurologic function prior to therapy.",
  },
  "ARWell Pro": {
    absoluteContra: [],
    cautionaryContra: ["seizure_disorder", "severe_cognitive_impairment", "vision_impairment"],
    description:
      "A healthcare-focused augmented reality system that turns a tablet into an interactive therapy tool using augmented reality games and exercises without requiring wearable sensors or controllers.",
  },
  BalanceBelt: {
    absoluteContra: [],
    cautionaryContra: [],
    description:
      "The BalanceBelt is a lightweight device that helps patients with vestibular disorders or balance deficits. It delivers haptic feedback/gentle vibrations that signal body position and balance. The brain interprets these signals subconsciously, and the wearer adjusts posture and improves balance as a result.",
  },
  Biomotum: {
    absoluteContra: ["contractures", "hypertonicity"],
    cautionaryContra: [],
    description: "TBD",
  },
  "BrainQ Technologies BQ3.0": {
    absoluteContra: ["craniectomy", "implanted_electronic_devices", "seizures"],
    cautionaryContra: ["cancer"],
    description:
      "Non-invasive, low-intensity, low-frequency electromagnetic fields to stimulate neuroplasticity.",
  },
  "Barrett Upper-Extremity Robot Trainer (BURT)": {
    absoluteContra: ["contractures", "hypertonicity"],
    cautionaryContra: ["open_wounds", "pain"],
    description: "TBD",
  },
  "C-Brace": {
    absoluteContra: ["contractures", "hypertonicity", "weight_gt_275lbs"],
    cautionaryContra: [
      "absent_trunk_control",
      "cognitive_impairment",
      "leg_length_discrepancy",
      "open_wounds",
    ],
    description: "TBD",
  },
  "Cadence Shoe": {
    absoluteContra: [],
    cautionaryContra: [],
    description: "TBD",
  },
  "Ekso GT/NR": {
    absoluteContra: ["hypertonicity_mas_gt_3", "weight_gt_220lbs"],
    cautionaryContra: [
      "contractures",
      "open_wounds",
      "osteoporosis",
      "pregnancy",
      "significant_leg_length_discrepancy",
    ],
    description:
      "Robotic exoskeleton used in rehab settings to assist patients with neurological conditions with ambulation.",
  },
  "Functional Electrical Stimulation": {
    absoluteContra: ["implanted_electronic_devices"],
    cautionaryContra: ["cancer", "cardiac_conditions", "metal_implants", "open_wounds", "pregnancy"],
    description: "TBD",
    details:
      "Examples include Cionic Neural Sleeve, Bioness L300, Hasomed RehaMove, TrainFES, and Schuhfried Medizintechnik Stimulator Rise.",
  },
  "Gloreha Sinfonia": {
    absoluteContra: ["contractures", "hypertonicity"],
    cautionaryContra: ["open_wounds", "pain"],
    description: "TBD",
  },
  "Hypershell X": {
    absoluteContra: ["contractures"],
    cautionaryContra: [],
    description: "TBD",
  },
  "Idego by Ekso": {
    absoluteContra: ["hypertonicity_mas_gt_3"],
    cautionaryContra: [
      "absent_trunk_control",
      "contractures",
      "open_wounds",
      "osteoporosis",
      "pregnancy",
      "severe_cognitive_impairment",
    ],
    description:
      "Powered lower-limb exoskeleton developed by Ekso Bionics to assist individuals with mobility impairments.",
  },
  "Kinesix VR": {
    absoluteContra: ["seizures"],
    cautionaryContra: ["cognitive_impairment", "vision_impairment"],
    description:
      "Medical virtual reality rehabilitation platform that combines Immersive VR environment, artificial intelligence (AI) to personalize exercise difficulty and progression, real-time movement tracking with a wide library of therapeutic exercises.",
  },
  "Magnes Nushu": {
    absoluteContra: ["open_wounds"],
    cautionaryContra: ["implanted_electronic_devices", "peripheral_neuropathy"],
    description:
      "NUSHU are sensor-embedded shoes that provide clinical-grade gait analysis and real-time biofeedback to help people with neurological gait disorders walk more confidently. They enable clinicians the ability to monitor mobility both in and out of the clinic.",
  },
  "Ottobock Exopulse Suit": {
    absoluteContra: [
      "implanted_electronic_devices",
      "open_wounds",
      "pregnancy",
      "skin_infection",
      "ventilator_life_support",
    ],
    cautionaryContra: [
      "cancer",
      "cardiac_conditions",
      "infectious_disease_fever",
      "rashes_skin_disease",
      "uncontrolled_seizures",
    ],
    description:
      "A full-body neuromodulation device that uses low-energy electrical stimulation to relax spastic muscles and activate weak ones through reciprocal inhibition. By improving muscle function and reducing pain.",
  },
  "Powered Knee Ankle Foot Orthosis": {
    absoluteContra: ["contractures", "hypertonicity"],
    cautionaryContra: [
      "absent_trunk_control",
      "cognitive_impairment",
      "leg_length_discrepancy",
      "open_wounds",
    ],
    description: "TBD",
  },
  "ReWalk Restore": {
    absoluteContra: ["contractures", "dvt", "urethane_allergy"],
    cautionaryContra: [],
    description: "TBD",
  },
  "ReWalk by Lifeward": {
    absoluteContra: ["hypertonicity_mas_gt_3"],
    cautionaryContra: [
      "absent_trunk_control",
      "contractures",
      "open_wounds",
      "osteoporosis",
      "pregnancy",
      "severe_cognitive_impairment",
    ],
    description: "TBD",
  },
  "Transcutaneous Spinal Cord Stimulation": {
    absoluteContra: ["implanted_electronic_devices", "pregnancy"],
    cautionaryContra: ["cancer", "cardiac_conditions", "uncontrolled_seizures"],
    description:
      "A non-invasive neuromodulation technique that delivers mild electrical currents through the skin over the spine to activate spinal cord circuits.",
  },
  "Transcutaneous Vagal Nerve Stimulation": {
    absoluteContra: ["implanted_electronic_devices", "pregnancy"],
    cautionaryContra: ["cancer", "cardiac_conditions"],
    description:
      "A non-invasive neuromodulation technique that stimulates the auricular branch of the vagus nerve through the skin using mild electrical pulses.",
  },
  WIM: {
    absoluteContra: ["contractures"],
    cautionaryContra: [],
    description: "TBD",
  },
  Zeen: {
    absoluteContra: ["weight_gt_250lbs"],
    cautionaryContra: ["absent_trunk_control", "cognitive_impairment", "osteoporosis"],
    description: "TBD",
  },
};

function getContraLabelById(id) {
  return contraindications.find((item) => item.id === id)?.label || id;
}

function getDeviceStatus(deviceName, selectedContraIds) {
  const profile = deviceProfiles[deviceName] || { absoluteContra: [], cautionaryContra: [] };

  const hasAbsolute = selectedContraIds.some((id) => profile.absoluteContra.includes(id));
  if (hasAbsolute) return "absolute";

  const hasCautionary = selectedContraIds.some((id) => profile.cautionaryContra.includes(id));
  if (hasCautionary) return "cautionary";

  return "clear";
}

function getStatusClasses(status) {
  if (status === "absolute") {
    return {
      card: "border-red-200 bg-red-50 shadow-red-100/60",
      text: "text-red-700",
      badge: "bg-red-100 text-red-700 border-red-200",
      label: "Absolute contraindication selected",
    };
  }

  if (status === "cautionary") {
    return {
      card: "border-orange-200 bg-orange-50 shadow-orange-100/60",
      text: "text-orange-700",
      badge: "bg-orange-100 text-orange-700 border-orange-200",
      label: "Precautionary contraindication selected",
    };
  }

  return {
    card: "border-green-200 bg-green-50 shadow-green-100/60",
    text: "text-green-700",
    badge: "bg-green-100 text-green-700 border-green-200",
    label: "No contraindications selected",
  };
}

function getRelevantDetails(deviceName, selectedContraIds) {
  const profile = deviceProfiles[deviceName] || { absoluteContra: [], cautionaryContra: [] };

  const absoluteSelected = selectedContraIds.filter((id) => profile.absoluteContra.includes(id));
  const cautionarySelected = selectedContraIds.filter((id) => profile.cautionaryContra.includes(id));

  return {
    absoluteCount: absoluteSelected.length,
    cautionaryCount: cautionarySelected.length,
    total: absoluteSelected.length + cautionarySelected.length,
    absoluteLabels: absoluteSelected.map(getContraLabelById),
    cautionaryLabels: cautionarySelected.map(getContraLabelById),
  };
}

export default function App() {
  const [selectedIndications, setSelectedIndications] = useState([]);
  const [selectedContraIds, setSelectedContraIds] = useState([]);

  const visibleDevices = useMemo(() => {
    return [
      ...new Set(
        indications
          .filter((item) => selectedIndications.includes(item.id))
          .flatMap((item) => item.devices)
      ),
    ];
  }, [selectedIndications]);

  function toggleIndication(id) {
    setSelectedIndications((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function toggleContra(id) {
    setSelectedContraIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function resetAll() {
    setSelectedIndications([]);
    setSelectedContraIds([]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Tech Immersion Flowchart
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            Select indications and contraindications to explore device options. Each device determines
            for itself whether a selected contraindication is absolute, precautionary, or not relevant.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={resetAll}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-200/60 backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">1. Indications</h2>
            <p className="mt-1 text-sm text-slate-500">
              Select all patient indications that apply.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {indications.map((item) => {
                const checked = selectedIndications.includes(item.id);

                return (
                  <label
                    key={item.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition ${
                      checked
                        ? "border-slate-900 bg-slate-900 text-white shadow-md"
                        : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleIndication(item.id)}
                      className="mt-1 h-4 w-4 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-medium leading-5">{item.label}</div>
                      <div className={`mt-1 text-xs ${checked ? "text-slate-300" : "text-slate-500"}`}>
                        {item.devices.length} device{item.devices.length === 1 ? "" : "s"}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-200/60 backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">2. Contraindications</h2>
            <p className="mt-1 text-sm text-slate-500">
              This is one shared list. Severity is determined by the device, not by the global list.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {contraindications.map((item) => {
                const checked = selectedContraIds.includes(item.id);

                return (
                  <label
                    key={item.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3 transition ${
                      checked
                        ? "border-slate-900 bg-slate-50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleContra(item.id)}
                      className="mt-1 h-4 w-4 shrink-0"
                    />
                    <span className="text-sm font-medium leading-5 text-slate-800">{item.label}</span>
                  </label>
                );
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg shadow-slate-200/60 backdrop-blur">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">3. Candidate Devices</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Device color reflects only the contraindications that are relevant to that device.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-xs font-medium">
                <span className="rounded-full border border-green-200 bg-green-100 px-3 py-1 text-green-700">
                  Green = Proceed
                </span>
                <span className="rounded-full border border-orange-200 bg-orange-100 px-3 py-1 text-orange-700">
                  Orange = Proceed with Caution
                </span>
                <span className="rounded-full border border-red-200 bg-red-100 px-3 py-1 text-red-700">
                  Red = Contraindicated
                </span>
              </div>
            </div>

            {visibleDevices.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center text-slate-500">
                Select at least one indication to display devices.
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-4 2xl:grid-cols-2">
                {visibleDevices.map((device) => {
                  const status = getDeviceStatus(device, selectedContraIds);
                  const classes = getStatusClasses(status);
                  const details = getRelevantDetails(device, selectedContraIds);
                  const profile = deviceProfiles[device] || {
                    absoluteContra: [],
                    cautionaryContra: [],
                    description: "TBD",
                  };

                  return (
                    <div
                      key={device}
                      className={`rounded-3xl border p-5 shadow-lg transition ${classes.card}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className={`text-2xl font-bold leading-tight ${classes.text}`}>{device}</h3>
                          <p className="mt-2 text-sm text-slate-600">
                            Device-specific contraindications:{" "}
                            {profile.absoluteContra.length + profile.cautionaryContra.length}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${classes.badge}`}
                        >
                          {classes.label}
                        </span>
                      </div>

                      <div className="mt-4">
                        <details className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                          <summary className="cursor-pointer text-sm font-semibold text-slate-700">
                            Device description
                          </summary>
                          <p className="mt-3 text-sm leading-6 text-slate-600">
                            {profile.description || "TBD"}
                          </p>
                          {profile.details ? (
                            <p className="mt-3 text-sm leading-6 text-slate-500">{profile.details}</p>
                          ) : null}
                        </details>
                      </div>

                      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-white/80 p-4">
                          <div className="text-xs uppercase tracking-wide text-slate-500">Status</div>
                          <div className={`mt-1 text-base font-semibold ${classes.text}`}>
                            {status === "clear"
                              ? "Proceed"
                              : status === "cautionary"
                              ? "Proceed with Caution"
                              : "Contraindicated"}
                          </div>
                        </div>

                        <div className="rounded-2xl bg-white/80 p-4">
                          <div className="text-xs uppercase tracking-wide text-slate-500">
                            Relevant selected
                          </div>
                          <div className="mt-1 text-base font-semibold text-slate-900">
                            {details.total}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-white/80 p-4">
                          <div className="text-xs uppercase tracking-wide text-slate-500">
                            Absolute selected
                          </div>
                          <div className="mt-1 text-base font-semibold text-slate-900">
                            {details.absoluteCount}
                          </div>
                          <div className="mt-2 text-xs leading-5 text-slate-500">
                            {details.absoluteLabels.length > 0
                              ? details.absoluteLabels.join(", ")
                              : "None selected"}
                          </div>
                        </div>

                        <div className="rounded-2xl bg-white/80 p-4">
                          <div className="text-xs uppercase tracking-wide text-slate-500">
                            Precautionary selected
                          </div>
                          <div className="mt-1 text-base font-semibold text-slate-900">
                            {details.cautionaryCount}
                          </div>
                          <div className="mt-2 text-xs leading-5 text-slate-500">
                            {details.cautionaryLabels.length > 0
                              ? details.cautionaryLabels.join(", ")
                              : "None selected"}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}