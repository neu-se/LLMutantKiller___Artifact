import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc method", () => {
  it("should return a complex number with imaginary part Infinity when called on Complex(0, 0)", () => {
    const zero = new Complex(0, 0);
    const result = zero.acsc();
    
    // Original returns Complex(PI/2, Infinity)
    // Mutated skips the early return, d=0, computes Complex(0,0).asin() = Complex(0,0)
    expect(result.im).toBe(Infinity);
  });
});