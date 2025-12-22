export const removeNonNumericChars = (input: string): string => {
  // Allow only numbers and a single dot for floating point
  const cleaned = input.replace(/[^0-9.]/g, ""); // Remove non-numeric and non-dot
  const parts = cleaned.split(".");

  if (parts.length === 1) return parts[0]; // Only digits
  // Reconstruct with only the first dot
  return parts[0] + "." + parts.slice(1).join("");
};

export const calculateAverageDiameter = (
  count: number,
  calibration: number,
  depth: number
): string | "" => {
  if (
    isNaN(count) ||
    isNaN(calibration) ||
    isNaN(depth) ||
    count <= 0 ||
    calibration <= 0 ||
    depth <= 0
  ) {
    return "";
  }

  // Perform calculation
  const numerator = 4 * count * calibration * 27;
  const denominator = 3.1415 * depth;

  // Avoid division by zero
  if (denominator === 0) return "";

  const avgDiameter = 12 * Math.sqrt(numerator / denominator);

  return avgDiameter.toFixed(3);
};

export const formatTimeHrMinSec = (secs: number): string => {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const seconds = secs % 60;

  const parts: string[] = [];

  if (hours > 0) {
    parts.push(`${hours} hr`);
  }

  if (minutes > 0) {
    parts.push(`${minutes} min`);
  }

  if (seconds > 0 || parts.length === 0) {
    parts.push(`${seconds} sec`);
  }

  return parts.join(" ");
};

export const normalizeNumber = (value: string): number => {
  if (value === "") return 0;
  return Number(value.replace(/^0+(?=\d)/, ""));
};
