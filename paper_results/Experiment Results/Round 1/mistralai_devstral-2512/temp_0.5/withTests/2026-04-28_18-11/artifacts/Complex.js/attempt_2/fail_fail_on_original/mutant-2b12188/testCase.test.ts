import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh method", () => {
  it("should correctly handle the acosh operation for a complex number with positive real part", () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(0.88137, 4);
    expect(result.im).toBeCloseTo(0.65848, 4);
  });
});