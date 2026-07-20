import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a specific complex number", () => {
    const c = new Complex(0.5, 0);
    const result = c.atanh();
    const expectedRe = 0.5493061443340548;
    const expectedIm = 0;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});