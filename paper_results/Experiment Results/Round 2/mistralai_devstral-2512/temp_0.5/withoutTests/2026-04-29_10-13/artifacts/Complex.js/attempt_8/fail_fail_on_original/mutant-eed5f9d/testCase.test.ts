import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should handle case where real part is non-zero and imaginary part is zero", () => {
    const c = new Complex(0.5, 0);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(1.4436354751788103);
    expect(result.im).toBeCloseTo(0);
  });
});