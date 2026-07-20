import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should correctly compute the arc cosecant of a complex number with negative imaginary part", () => {
    const c = new Complex(1, -1);
    const result = c.acsc();
    const expectedRe = 0.402359478108525;
    const expectedIm = -1.004851779355448;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});