import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should correctly compute the arcsecant of a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.asec();
    expect(result.re).toBeCloseTo(0.4, 1);
    expect(result.im).toBeCloseTo(-1.0, 1);
  });
});