import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc()", () => {
  it("should correctly compute the cosecant of a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    expect(result.re).toBeCloseTo(0.6158947478, 9);
    expect(result.im).toBeCloseTo(-0.2832832833, 9);
  });
});