import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a complex number with equal real and imaginary parts", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    const expectedRe = 0.337632564484855;
    const expectedIm = -0.3217505543966422;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});