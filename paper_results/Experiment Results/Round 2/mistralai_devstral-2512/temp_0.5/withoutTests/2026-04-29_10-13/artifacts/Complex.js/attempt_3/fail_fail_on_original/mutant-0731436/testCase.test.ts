import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should correctly handle the case when real part is 0 and imaginary part is non-zero", () => {
    const result = new Complex(0, 1).asec();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-1.5707963267948966);
  });
});