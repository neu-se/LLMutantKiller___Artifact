import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should correctly compute the arcsecant of a complex number", () => {
    const c = new Complex(2, 3);
    const result = c.asec();
    expect(result.re).toBeCloseTo(0.443, 3);
    expect(result.im).toBeCloseTo(-1.326, 3);
  });
});