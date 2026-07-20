import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc()", () => {
  it("should correctly compute the cosecant of a purely imaginary number", () => {
    const c = new Complex(0, 1);
    const result = c.csc();
    expect(result.re).toBeCloseTo(0, 9);
    expect(result.im).toBeCloseTo(-0.8509181282, 9);
  });
});