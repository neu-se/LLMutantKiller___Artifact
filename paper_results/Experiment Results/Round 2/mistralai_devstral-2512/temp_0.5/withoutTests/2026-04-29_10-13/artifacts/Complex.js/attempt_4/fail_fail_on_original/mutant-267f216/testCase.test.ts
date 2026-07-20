import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a complex number with equal real and imaginary parts", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    const expectedRe = 0.5306375309525179;
    const expectedIm = -0.5947927824064536;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});