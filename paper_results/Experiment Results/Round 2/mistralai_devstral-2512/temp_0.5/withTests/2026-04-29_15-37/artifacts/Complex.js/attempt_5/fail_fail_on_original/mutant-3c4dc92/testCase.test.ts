import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should correctly compute atanh for a complex number where real part is 0.5", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    // The mutation changes oneMinus * oneMinus to oneMinus / oneMinus
    // For this input, oneMinus = 0.5, so original computes 0.25 while mutant computes 1
    // This will affect the denominator and thus the final result
    expect(result.re).toBeCloseTo(0.2554128115193155, 10);
    expect(result.im).toBeCloseTo(0.5493061443340548, 10);
  });
});