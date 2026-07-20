import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should compute atanh correctly for complex number (0.6, 0.2)", () => {
    const c = new Complex(0.6, 0.2);
    const result = c.atanh();
    // The mutation changes oneMinus * oneMinus to oneMinus / oneMinus
    // For this input, oneMinus = 0.4, so original computes 0.16 while mutant computes 1
    // This affects the denominator calculation and thus the final result
    expect(result.re).toBeCloseTo(0.2299, 4);
    expect(result.im).toBeCloseTo(0.2027, 4);
  });
});