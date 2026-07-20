import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly handle case where real part is zero and imaginary part is non-zero", () => {
    const c = new Complex(0, 2);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-0.4636476090008061);
  });
});