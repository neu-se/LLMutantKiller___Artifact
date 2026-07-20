import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should correctly compute the arcsecant of a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.asec();
    expect(result.re).toBeCloseTo(1.1185178796437059, 10);
    expect(result.im).toBeCloseTo(0.5306375309525179, 10);
  });
});