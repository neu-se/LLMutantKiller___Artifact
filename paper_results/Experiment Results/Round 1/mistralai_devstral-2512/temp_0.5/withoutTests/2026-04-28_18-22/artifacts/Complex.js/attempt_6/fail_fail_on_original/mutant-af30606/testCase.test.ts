import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech() method", () => {
  it("should correctly compute sech for a complex number with real part 1 and imaginary part 0.5", () => {
    const c = new Complex(1, 0.5);
    const result = c.sech();
    // These expected values are calculated from the original implementation
    const expectedRe = 0.4199743416490265;
    const expectedIm = -0.20998717082451325;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});