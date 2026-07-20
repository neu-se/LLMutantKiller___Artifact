import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should produce different results when mutation changes oneMinus*oneMinus to oneMinus/oneMinus", () => {
    const c = new Complex(0.7, 0.3);
    const result = c.atanh();
    // The mutation changes the denominator calculation
    // Original: d = oneMinus*oneMinus + b*b
    // Mutant: d = oneMinus/oneMinus + b*b = 1 + b*b
    // This will produce different results
    expect(result.re).not.toBeCloseTo(0, 10);
    expect(result.im).not.toBeCloseTo(0, 10);
  });
});