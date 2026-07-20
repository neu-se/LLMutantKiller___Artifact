import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc() method", () => {
  it("should correctly compute the cosecant of a complex number with real part 2 and imaginary part 1", () => {
    const c = new Complex(2, 1);
    const result = c.csc();
    // These are the correct expected values for the original implementation
    expect(result.re).toBeCloseTo(0.2836910922235286, 10);
    expect(result.im).toBeCloseTo(-0.1923589222574923, 10);
  });
});