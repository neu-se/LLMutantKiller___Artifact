import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with negative imaginary unit", () => {
    const c = new Complex("-i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(-1);
  });
});