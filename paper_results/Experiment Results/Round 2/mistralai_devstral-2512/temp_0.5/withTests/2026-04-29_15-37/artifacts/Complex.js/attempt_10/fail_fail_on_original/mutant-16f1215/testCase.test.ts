import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should handle complex numbers with zero real part and non-zero imaginary part", () => {
    const c = new Complex(0, 0.5);
    const result = c.acsc();
    // The mutation changes (a !== 0) to (true) in the acsc method
    // When a=0, the original code should use the first branch (a/d, -b/d).asinh()
    // The mutated code would incorrectly use the second branch
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-1.4706289056333368);
  });
});