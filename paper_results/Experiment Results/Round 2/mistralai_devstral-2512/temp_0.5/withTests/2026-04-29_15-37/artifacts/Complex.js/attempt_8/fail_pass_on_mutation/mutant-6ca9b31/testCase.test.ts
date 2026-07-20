import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number string representation", () => {
  it("should correctly format complex number with negative imaginary part when real part is non-zero", () => {
    const c = new Complex(3, -2);
    expect(c.toString()).toBe("3 - 2i");
  });
});