import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch function", () => {
  it("should correctly compute acsch for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    const expectedRe = result.re;
    const expectedIm = result.im;
    const c2 = new Complex(2, 2);
    const result2 = c2.acsch();
    expect(result2.re).toBeCloseTo(expectedRe, 10);
    expect(result2.im).toBeCloseTo(expectedIm, 10);
  });
});