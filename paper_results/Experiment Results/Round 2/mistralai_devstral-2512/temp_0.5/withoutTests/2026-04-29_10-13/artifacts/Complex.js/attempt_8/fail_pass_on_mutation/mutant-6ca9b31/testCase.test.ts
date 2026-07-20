import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.toString()", () => {
  it("should correctly format complex numbers with negative imaginary parts when real part is present and imaginary coefficient is not 1", () => {
    const c = new Complex(2, -2);
    expect(c.toString()).toBe("2 - 2i");
  });
});