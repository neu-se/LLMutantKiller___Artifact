import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should correctly compute the arcsecant of a complex number", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asec();
    const expectedRe = 0.9045568943023813;
    const expectedIm = -1.030376882385101;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});