import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech() method", () => {
  it("should correctly compute sech for a complex number with specific real and imaginary parts", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.sech();
    const expectedRe = 0.786447738133657;
    const expectedIm = -0.213552261866343;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});