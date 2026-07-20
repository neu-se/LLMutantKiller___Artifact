import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with consecutive minus signs", () => {
    const c = new Complex("1--2i");
    expect(c.re).toBe(1);
    expect(c.im).toBe(2);
  });
});