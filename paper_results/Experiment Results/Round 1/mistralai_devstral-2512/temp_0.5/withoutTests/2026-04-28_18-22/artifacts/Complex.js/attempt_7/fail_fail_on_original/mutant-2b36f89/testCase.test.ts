import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc", () => {
  it("should correctly compute the cosecant of a complex number with real part 2 and imaginary part 1", () => {
    const c = new Complex(2, 1);
    const result = c.csc();
    expect(result.re).toBeCloseTo(0.2837, 4);
    expect(result.im).toBeCloseTo(-0.1093, 4);
  });
});