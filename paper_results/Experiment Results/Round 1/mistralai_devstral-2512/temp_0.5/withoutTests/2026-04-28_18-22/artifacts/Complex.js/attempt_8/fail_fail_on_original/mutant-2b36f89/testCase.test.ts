import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc", () => {
  it("should correctly compute the cosecant of a complex number with real part 1 and imaginary part 2", () => {
    const c = new Complex(1, 2);
    const result = c.csc();
    expect(result.re).toBeCloseTo(0.1386, 4);
    expect(result.im).toBeCloseTo(-0.1061, 4);
  });
});