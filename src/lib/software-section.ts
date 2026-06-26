export interface StandardSoftwareCard {
  id: string;
  variant: "standard";
  title: string;
  body: string;
  pillLabel: string;
}

export interface SummarySoftwareCard {
  id: string;
  variant: "summary";
  title: string;
  body: string;
  readoutText: string;
}

export type SoftwareCard = StandardSoftwareCard | SummarySoftwareCard;

export interface SoftwareSectionContent {
  eyebrow: string;
  headline: string;
  cards: SoftwareCard[];
}

export const DEFAULT_SOFTWARE_CARDS: SoftwareCard[] = [
  {
    id: "wear-off",
    variant: "standard",
    title: "Wear-off prediction",
    body: "A per-patient model learns each patient's response pattern and predicts when levodopa is wearing off, roughly fifteen minutes before full symptom return.",
    pillLabel: "Predictive",
  },
  {
    id: "fall-risk",
    variant: "standard",
    title: "Fall risk scoring",
    body: "Gait variability during walking periods is scored daily against validated fall-risk models, giving clinicians advance warning.",
    pillLabel: "Daily score",
  },
  {
    id: "clinical-summary",
    variant: "summary",
    readoutText:
      "Patient exhibits mild resting tremor at 4.2 Hz, UPDRS score 2. Peak medication response at T+62 min",
    title: "AI clinical summary",
    body: "Each session generates a structured note in clinical language, ready to include in the patient record.",
  },
];

export const DEFAULT_SOFTWARE_SECTION: SoftwareSectionContent = {
  eyebrow: "Software",
  headline: "Three AI features built for movement disorder care.",
  cards: DEFAULT_SOFTWARE_CARDS,
};
