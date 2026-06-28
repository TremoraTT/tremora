export interface DeviceSectionContent {
  eyebrow: string;
  headline: string;
  bodyPoints: string[];
}

export const DEFAULT_DEVICE_SECTION: DeviceSectionContent = {
  eyebrow: "The Device",
  headline: "Built around one clinical question.",
  bodyPoints: [
    "Purpose-built for tremor. Not a consumer smartwatch with a tremor mode.",
    "Continuous all-day wear. Rechargeable.",
    "Tuned to the tremor band, sampling fast enough to resolve frequency cleanly.",
  ],
};
