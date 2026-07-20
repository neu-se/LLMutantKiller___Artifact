import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech() method", () => {
  it("should correctly compute sech for a complex number with real part 0.1 and imaginary part 0.1", () => {
    const c = new Complex(0.1, 0.1);
    const result = c.sech();
    // These expected values are calculated from the original implementation
    const expectedRe = 0.9900498337491678;
    const expectedIm = -0.0099501662508322;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});