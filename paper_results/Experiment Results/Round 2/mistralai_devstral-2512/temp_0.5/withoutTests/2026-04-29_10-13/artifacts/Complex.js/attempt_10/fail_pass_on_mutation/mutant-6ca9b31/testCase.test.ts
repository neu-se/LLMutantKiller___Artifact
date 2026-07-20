import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.toString()", () => {
  it("should correctly format complex numbers with negative imaginary parts when real part is present and imaginary coefficient is exactly -1", () => {
    const c = new Complex(2, -1);
    expect(c.toString()).toBe("2 - i");
  });
});