import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc() method", () => {
  it("should correctly compute the cosecant of a complex number", () => {
    const c = new Complex(1, 0);
    const result = c.csc();
    expect(result.re).toBeCloseTo(Math.sin(1), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});