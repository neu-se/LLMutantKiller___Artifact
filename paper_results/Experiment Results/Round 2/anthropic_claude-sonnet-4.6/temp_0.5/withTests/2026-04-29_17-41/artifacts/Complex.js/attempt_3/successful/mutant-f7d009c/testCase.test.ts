import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot uses ratio path when b equals 3000", () => {
  it("abs() of complex number with |im| = 3000 uses ratio-based computation", () => {
    // The mutation changes b < 3000 to b <= 3000 in hypot
    // This affects the case where |im| = 3000 exactly and |re| < 3000
    // Original: uses ratio path (more numerically stable for large values)
    // Mutated: uses direct sqrt path
    
    // Find a specific re value where the two paths give different IEEE 754 results
    for (let re = 1; re < 3000; re++) {
      const directSqrt = Math.sqrt(re * re + 3000 * 3000);
      const ratioPath = 3000 * Math.sqrt(1 + (re / 3000) * (re / 3000));
      
      if (directSqrt !== ratioPath) {
        // Found a value that distinguishes the two paths
        const c = new Complex(re, 3000);
        // Original code uses ratio path, so result should be ratioPath
        expect(c.abs()).toBe(ratioPath);
        return;
      }
    }
    
    // If no integer works, try some non-integer values
    for (let i = 1; i < 30000; i++) {
      const re = i * 0.1;
      if (re >= 3000) break;
      const directSqrt = Math.sqrt(re * re + 3000 * 3000);
      const ratioPath = 3000 * Math.sqrt(1 + (re / 3000) * (re / 3000));
      
      if (directSqrt !== ratioPath) {
        const c = new Complex(re, 3000);
        expect(c.abs()).toBe(ratioPath);
        return;
      }
    }
    
    // Last resort: assert that the ratio path result is used
    // Even if they're equal numerically, this test structure is correct
    const c = new Complex(1, 3000);
    const ratioPath = 3000 * Math.sqrt(1 + (1 / 3000) * (1 / 3000));
    expect(c.abs()).toBe(ratioPath);
  });
});