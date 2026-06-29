import { TSI_SHORT } from "@/lib/constants";
import {
  DEFAULT_CHART_CONFIG,
  DEFAULT_STAT_CARDS,
  type DashboardStatCard,
  type MedicationResponseChartConfig,
} from "@/lib/medication-response-curve";

export type SoftwareFeatureEmphasis = "hero" | "prominent" | "standard";

export interface SoftwareFeatureCard {
  id: string;
  title: string;
  body: string;
  pillLabel: string;
  emphasis: SoftwareFeatureEmphasis;
  readoutText?: string;
}

export interface PatientManagementBlock {
  timeSavedLead: string;
  headline: string;
  body: string;
}

export interface BeforeAfterBlock {
  beforeLabel: string;
  beforeBody: string;
  afterLabel: string;
  afterBody: string;
}

export interface SoftwareSectionContent {
  eyebrow: string;
  headline: string;
  betweenVisitsLead: string;
  curveHeadlineBeforeAccent: string;
  curveHeadlineAccent: string;
  curveHeadlineAfterAccent: string;
  curveSubline: string;
  featuresIntro: string;
  featureCards: SoftwareFeatureCard[];
  patientManagement: PatientManagementBlock;
  beforeAfter: BeforeAfterBlock;
  statCards: DashboardStatCard[];
  chartConfig: MedicationResponseChartConfig;
}

export const DEFAULT_SOFTWARE_FEATURE_CARDS: SoftwareFeatureCard[] = [
  {
    id: "medication-response",
    emphasis: "hero",
    title: "Medication-response tracking",
    body: "Every dose, mapped to the tremor it controls. Onset, peak relief, and the moment benefit fades, scored automatically.",
    pillLabel: "Dose → response",
  },
  {
    id: "clinical-notes",
    emphasis: "standard",
    title: "Appointment-ready clinical notes",
    body: "Each session writes its own structured note in clinical language, ready to drop into the record. Zero documentation burden.",
    pillLabel: "Ready to chart",
    readoutText:
      `Patient exhibits mild resting tremor at 4.2 Hz, ${TSI_SHORT} score 2. Peak medication response at T+62 min`,
  },
  {
    id: "phenotype-hint",
    emphasis: "standard",
    title: "Phenotype hint",
    body: "Distinguishes rest, postural, and kinetic tremor automatically. A phenotype estimate, not a clinical diagnosis.",
    pillLabel: "Estimate",
  },
  {
    id: "ask-tremora",
    emphasis: "prominent",
    title: "Ask Tremora",
    body: "Ask any question about a patient's record in plain language and get an answer grounded only in their data.",
    pillLabel: "Plain language",
    readoutText:
      "Q: How has morning tremor changed since the last dose increase?\nA: Morning severity trending down over three weeks, strongest improvement between 6 and 9 AM.",
  },
];

export const DEFAULT_SOFTWARE_SECTION: SoftwareSectionContent = {
  eyebrow: "Software",
  headline: "The intelligence layer movement-disorder care never had.",
  betweenVisitsLead:
    "Between appointments, tremor severity shifts by the hour. Tremora turns that invisible gap into continuous, objective data.",
  curveHeadlineBeforeAccent: "Watch the exact minute a dose ",
  curveHeadlineAccent: "takes hold",
  curveHeadlineAfterAccent: ", and the exact minute it fails.",
  curveSubline:
    "A view no clinic visit, and no other device, can give, especially between appointments.",
  featuresIntro:
    "Four capabilities built for the gap between visits, not just the ten minutes in the exam room.",
  featureCards: DEFAULT_SOFTWARE_FEATURE_CARDS,
  patientManagement: {
    timeSavedLead:
      "Open the dashboard and get the answer in seconds, not minutes.",
    headline:
      "One dashboard. Every patient, every dose, every trend, between every visit.",
    body: "Easier patient management means walking into each appointment already knowing what happened since the last one.",
  },
  beforeAfter: {
    beforeLabel: "Before Tremora",
    beforeBody: "One subjective score per quarter.",
    afterLabel: "With Tremora",
    afterBody:
      "Continuous severity, every dose tracked, trends across weeks between appointments.",
  },
  statCards: DEFAULT_STAT_CARDS,
  chartConfig: DEFAULT_CHART_CONFIG,
};
