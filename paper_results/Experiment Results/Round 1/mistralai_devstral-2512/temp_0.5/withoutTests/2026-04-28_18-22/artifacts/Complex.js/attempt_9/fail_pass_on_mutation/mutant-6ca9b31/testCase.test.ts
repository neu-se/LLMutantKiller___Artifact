import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number string representation", () => {
  it("should correctly format complex numbers with negative imaginary part when real part is non-zero and imaginary is -2", () => {
    const c = new Complex(1, -2);
    expect(c.toString()).toBe("1 - 2i");
  });
});