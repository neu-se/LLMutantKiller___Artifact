import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse complex numbers with imaginary parts having explicit positive sign", () => {
    const c = new Complex("3+i");
    expect(c.re).toBe(3);
    expect(c.im).toBe(1);
  });
});