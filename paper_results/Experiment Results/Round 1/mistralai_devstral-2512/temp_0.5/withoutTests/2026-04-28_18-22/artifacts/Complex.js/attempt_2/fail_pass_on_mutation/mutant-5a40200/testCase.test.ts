import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for small values near zero", () => {
    const z = new Complex(1e-10, 0);
    const result = z.cosh();
    const expectedRe = 1 - 0.5 * (1e-10) * (1e-10);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});