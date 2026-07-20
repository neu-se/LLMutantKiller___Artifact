import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex ceil method", () => {
  it("should correctly ceil the real part using multiplication by places", () => {
    // With places = 10^2 = 100 (for 2 decimal places)
    // Original: Math.ceil(re * places) / places
    // Mutated:  Math.ceil(re / places) / places
    // For re = 1.234 and places = 100:
    // Original: Math.ceil(1.234 * 100) / 100 = Math.ceil(123.4) / 100 = 124 / 100 = 1.24
    // Mutated:  Math.ceil(1.234 / 100) / 100 = Math.ceil(0.01234) / 100 = 1 / 100 = 0.01
    const c = new Complex(1.234, 5.678);
    const result = c.ceil(2);
    expect(result.re).toBeCloseTo(1.24, 10);
  });
});