import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number string representation", () => {
  it("should correctly format complex numbers with negative imaginary part when real part is zero and imaginary is -1", () => {
    const c = new Complex(0, -1);
    expect(c.toString()).toBe("-i");
  });
});