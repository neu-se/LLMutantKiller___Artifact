import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number string representation", () => {
  it("should correctly format complex number with negative imaginary part when real part is negative", () => {
    const c = new Complex(-2, -3);
    expect(c.toString()).toBe("-2 - 3i");
  });
});