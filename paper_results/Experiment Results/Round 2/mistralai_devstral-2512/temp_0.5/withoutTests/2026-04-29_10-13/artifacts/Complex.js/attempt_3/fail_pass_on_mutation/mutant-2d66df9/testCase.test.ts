import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex number with negative sign before imaginary unit", () => {
    const c = new Complex("5-i");
    expect(c.re).toBe(5);
    expect(c.im).toBe(-1);
  });
});