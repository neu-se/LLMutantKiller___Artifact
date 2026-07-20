import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex number with multiple signs before imaginary unit", () => {
    const c = new Complex("4+-i");
    expect(c.re).toBe(4);
    expect(c.im).toBe(-1);
  });
});