import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc()", () => {
  it("should correctly compute the cosecant for a complex number with real part 0.5 and imaginary part 0.5", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.csc();
    const expectedRe = 1.0782296946540224;
    const expectedIm = -0.489582221377743;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});