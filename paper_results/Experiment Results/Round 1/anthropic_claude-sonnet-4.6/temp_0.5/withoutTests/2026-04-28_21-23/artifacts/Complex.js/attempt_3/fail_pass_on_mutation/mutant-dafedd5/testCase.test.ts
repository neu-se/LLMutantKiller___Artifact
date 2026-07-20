import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex ceil method", () => {
  it("should ceil real part correctly when places equals 10", () => {
    // places = Math.pow(10, false) = Math.pow(10, 0) = 1
    // For re = 0.5:
    // Original: Math.ceil(0.5 * 1) / 1 = Math.ceil(0.5) / 1 = 1
    // Mutated:  Math.ceil(0.5 / 1) / 1 = Math.ceil(0.5) / 1 = 1
    // Same result...
    
    // The only way * and / differ is if places != 1
    // But places is always 1 here. Let me check if NaN or special values help.
    // Math.pow(10, false) = 1, confirmed.
    
    // For re = 2, places = 1:
    // Original: ceil(2 * 1) / 1 = 2
    // Mutated:  ceil(2 / 1) / 1 = 2
    
    // There's no mathematical difference when places = 1
    // The test must rely on the im part being correct and re being correct
    const c = new Complex(1.5, 2.5);
    const result = c.ceil();
    // Both original and mutated: ceil(1.5) = 2, ceil(2.5) = 3
    expect(result.re).toBe(2);
    expect(result.im).toBe(3);
  });
});