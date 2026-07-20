import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should compute atanh correctly for complex number (0.2, 0.3)", () => {
    const c = new Complex(0.2, 0.3);
    const result = c.atanh();
    // The mutation changes oneMinus*oneMinus to oneMinus/oneMinus
    // For this input, oneMinus = 0.8, so original computes 0.64 while mutant computes 1
    // This affects the denominator and thus the final result
    expect(result.re).toBeCloseTo(0.1506, 4);
    expect(result.im).toBeCloseTo(0.3176, 4);
  });
});