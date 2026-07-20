import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for small values near zero", () => {
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});