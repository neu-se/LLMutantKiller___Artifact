import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc() method", () => {
  it("should correctly compute the cosecant of a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    const expectedRe = 0.6158947478224965;
    const expectedIm = -0.3883735339784826;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});