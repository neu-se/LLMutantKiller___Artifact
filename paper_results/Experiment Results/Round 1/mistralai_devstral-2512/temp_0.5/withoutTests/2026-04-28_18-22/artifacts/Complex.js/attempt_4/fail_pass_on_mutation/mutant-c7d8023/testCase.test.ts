import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should handle division by zero correctly for complex numbers with zero real and imaginary parts", () => {
    const c = new Complex(0, 0);
    const result = c.acsch();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(0);
  });
});