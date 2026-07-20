import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc() method", () => {
  it("should correctly compute the cosecant of a complex number", () => {
    const c = new Complex(0, 1);
    const result = c.csc();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-0.8509181282393216, 10);
  });
});