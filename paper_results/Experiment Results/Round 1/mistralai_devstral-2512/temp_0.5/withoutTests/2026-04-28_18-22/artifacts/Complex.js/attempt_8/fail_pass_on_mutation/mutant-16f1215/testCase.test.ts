import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should correctly handle the case where real part is zero and imaginary part is non-zero", () => {
    const c = new Complex(0, 2);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-0.48121182505960347);
  });
});