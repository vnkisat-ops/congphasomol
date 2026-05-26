/**
 * Utility to convert basic chemical formulas with numbers to subscript equivalents.
 * E.g., "H2SO4" -> "H₂SO₄", "Cr2O7^2-" -> "Cr₂O₇²⁻"
 */
export function formatChemicalFormula(text: string): string {
  if (!text) return "";

  // Unicode subscripts for numbers
  const subscripts: Record<string, string> = {
    "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄",
    "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉"
  };

  // Unicode superscripts for charges
  const superscripts: Record<string, string> = {
    "+": "⁺", "-": "⁻", "0": "⁰", "1": "¹", "2": "²",
    "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷",
    "8": "⁸", "9": "⁹"
  };

  let result = text;

  // Render LaTeX-like formatting like H_2SO_4 or $H_2SO_4$
  // First, strip the $ signs if present
  result = result.replace(/\$/g, "");

  // Match expressions like X_y where y is a number
  result = result.replace(/([A-Za-z])_([0-9]+)/g, (_, element, num) => {
    const subNum = num.split("").map((char: string) => subscripts[char] || char).join("");
    return element + subNum;
  });

  // Match expressions like X^{y} or X^y
  result = result.replace(/\^\{?([0-9+-]+)\}?/g, (_, charge) => {
    return charge.split("").map((char: string) => superscripts[char] || char).join("");
  });

  // Simple fallbacks for common plain chemistry compounds in case they are entered plain:
  const commonReplacements: Record<string, string> = {
    "H2SO4": "H₂SO₄",
    "SO2": "SO₂",
    "H2S": "H₂S",
    "HNO3": "HNO₃",
    "N2O": "N₂O",
    "NH3": "NH₃",
    "NO2": "NO₂",
    "KMnO4": "KMnO₄",
    "NH4+": "NH₄⁺",
    "NO3-": "NO₃⁻",
    "SO42-": "SO₄²⁻",
    "Cr2O72-": "Cr₂O₇²⁻",
    "CH4": "CH₄",
    "C2H5OH": "C₂H₅OH",
    "Fe3O4": "Fe₃O₄",
    "O2": "O₂",
    "CO2": "CO₂",
    "Al2(SO4)3": "Al₂(SO₄)₃",
    "H2": "H₂",
    "FeSO4": "FeSO₄",
    "MgSO4": "MgSO₄",
    "NaClO": "NaClO",
    "NaCl": "NaCl",
    "KClO3": "KClO₃",
    "KCl": "KCl",
    "Fe(NO3)3": "Fe(NO₃)₃",
    "M(NO3)n": "M(NO₃)ₙ",
    "NxOy": "NₓO_y",
  };

  Object.entries(commonReplacements).forEach(([key, val]) => {
    const regex = new RegExp(`\\b${key}\\b`, 'g');
    result = result.replace(regex, val);
  });

  return result;
}

/**
 * Strips basic Markdown formatting for standard UI rendering if needed.
 */
export function formatMarkdown(text: string): string {
  if (!text) return "";
  let formatted = text;
  
  // Replace sub/superscripts on chemical formulas first
  formatted = formatChemicalFormula(formatted);

  // Bold
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, "$1");
  // Itals
  formatted = formatted.replace(/\*([^*]+)\*/g, "$1");
  
  return formatted;
}
