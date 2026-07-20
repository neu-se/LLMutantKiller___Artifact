import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should produce different results when oneMinus is divided by itself instead of squared", () => {
    const c = new Complex(0.8, 0.3);
    const result = c.atanh();
    // The mutation changes oneMinus * oneMinus to oneMinus / oneMinus
    // This will cause different behavior when oneMinus is not 1
    expect(result.re).toBeCloseTo(0.3466, 4);
    expect(result.im).toBeCloseTo(0.3096, 4);
  });
});