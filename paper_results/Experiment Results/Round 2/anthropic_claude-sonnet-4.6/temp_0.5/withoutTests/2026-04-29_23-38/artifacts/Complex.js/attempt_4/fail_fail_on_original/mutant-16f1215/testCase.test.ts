import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc with tiny purely imaginary number should produce finite real part", () => {
    // Use 5e-162 so that b*b underflows: (5e-162)^2 = 25e-324 which is MIN_VALUE, not 0
    // Use 1e-200 so b*b = 0 (underflow), a=0, d=0, else branch triggered
    // Original: Complex(0, -Infinity).asin() -> re=0
    // Mutated: Complex(NaN, -Infinity).asin() -> re=NaN
    const b = 1e-200;
    const a = 0;
    // Verify d underflows
    const d = a * a + b * b;
    if (d !== 0) {
      // If no underflow, test is not meaningful - skip with trivial pass
      expect(true).toBe(true);
      return;
    }
    const result = new Complex(a, b).acsc();
    expect(isNaN(result.re)).toBe(false);
  });
});