import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with multiple plus signs before imaginary unit", () => {
    const c = new Complex("1++2i");
    expect(c.re).toBe(1);
    expect(c.im).toBe(2);
  });
});