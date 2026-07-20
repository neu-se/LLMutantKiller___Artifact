import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly compute asinh for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(1, 2);
    const result = c.asinh();
    const expectedRe = 1.464349336822679;
    const expectedIm = 0.6035533905932738;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});