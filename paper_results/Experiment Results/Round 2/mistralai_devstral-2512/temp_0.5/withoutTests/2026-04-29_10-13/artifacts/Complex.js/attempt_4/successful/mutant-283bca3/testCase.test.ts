import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc", () => {
  it("should correctly compute the arc cosecant for a complex number with negative imaginary part", () => {
    const c = new Complex(1, -1);
    const result = c.acsc();
    const expectedRe = 0.4522784471511907;
    const expectedIm = 0.5306375309525178;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});