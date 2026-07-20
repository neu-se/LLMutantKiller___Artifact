import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech() method", () => {
  it("should correctly compute sech for a complex number with real part 2 and imaginary part 1", () => {
    const c = new Complex(2, 1);
    const result = c.sech();
    // These expected values are calculated from the original implementation
    const expectedRe = 0.2658022288340797;
    const expectedIm = -0.096404471123673;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});