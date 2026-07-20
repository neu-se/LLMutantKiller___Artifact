import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc() method", () => {
  it("should correctly compute the cosecant of a complex number with real part 0.1 and imaginary part 0.1", () => {
    const c = new Complex(0.1, 0.1);
    const result = c.csc();
    expect(result.re).toBeCloseTo(1.001667500199204, 10);
    expect(result.im).toBeCloseTo(-0.09983341664682815, 10);
  });
});