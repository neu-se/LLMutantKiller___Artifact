import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csc()", () => {
  it("should correctly compute the cosecant for a specific complex number", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.csc();
    expect(result.re).toBeCloseTo(1.29435732418071, 10);
    expect(result.im).toBeCloseTo(-0.383512578502305, 10);
  });
});