import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation", () => {
  it("should correctly compute cosh for complex numbers when Math.cosh is available", () => {
    const c = new Complex(1, 1);
    const result = c.cosh();
    // The correct result should be cosh(1)*cos(1) + i*sinh(1)*sin(1)
    expect(result.re).toBeCloseTo(0.833730211555746);
    expect(result.im).toBeCloseTo(1.2984575814159773);
  });
});