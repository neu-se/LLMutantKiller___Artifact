import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should correctly handle complex numbers with non-zero imaginary part when d is zero", () => {
    const result = new Complex(0, 1).asec();
    expect(result.re).toBeCloseTo(1.5707963267948966);
    expect(result.im).toBeCloseTo(-Infinity);
  });
});