import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should correctly compute sech for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(1, 1);
    const result = c.sech();
    const expectedRe = 0.49833703055518686;
    const expectedIm = -0.5910838417210451;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});