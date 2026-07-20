import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech() method", () => {
  it("should correctly compute sech for a complex number with real part 0.5 and imaginary part 0.25", () => {
    const c = new Complex(0.5, 0.25);
    const result = c.sech();
    // These expected values are calculated from the original implementation
    const expectedRe = 0.786447738133657;
    const expectedIm = -0.1067761309331715;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});