import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number string representation", () => {
  it("should correctly format complex numbers with negative zero imaginary part when real part is non-zero", () => {
    const c = new Complex(5, -0);
    expect(c.toString()).toBe("5");
  });
});