import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number string representation", () => {
  it("should correctly format complex numbers with zero imaginary part", () => {
    const c = new Complex(3, 0);
    expect(c.toString()).toBe("3");
  });
});