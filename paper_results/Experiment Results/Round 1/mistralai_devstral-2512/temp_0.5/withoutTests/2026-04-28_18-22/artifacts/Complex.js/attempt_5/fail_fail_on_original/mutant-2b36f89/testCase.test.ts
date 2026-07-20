import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc", () => {
  it("should correctly compute the cosecant of a complex number with small imaginary part", () => {
    const c = new Complex(0.1, 0.01);
    const result = c.csc();
    expect(result.re).toBeCloseTo(9.9666, 4);
    expect(result.im).toBeCloseTo(-0.9967, 4);
  });
});