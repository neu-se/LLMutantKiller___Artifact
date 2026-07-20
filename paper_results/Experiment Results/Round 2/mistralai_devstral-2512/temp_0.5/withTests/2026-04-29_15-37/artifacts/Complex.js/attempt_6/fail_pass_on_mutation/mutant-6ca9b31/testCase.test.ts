import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number string representation", () => {
  it("should correctly format complex number with negative zero imaginary part when real part is zero", () => {
    const c = new Complex(0, -0);
    expect(c.toString()).toBe("0");
  });
});