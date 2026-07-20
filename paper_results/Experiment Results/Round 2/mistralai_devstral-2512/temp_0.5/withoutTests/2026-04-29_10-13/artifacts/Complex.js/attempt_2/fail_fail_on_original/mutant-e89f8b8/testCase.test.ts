import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc() method", () => {
  it("should correctly compute the cosecant of a complex number", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.csc();
    expect(result.re).toBeCloseTo(0.7423218507108266, 10);
    expect(result.im).toBeCloseTo(-0.4284157447712374, 10);
  });
});