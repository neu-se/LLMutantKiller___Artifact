import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function behavior for large values", () => {
  it("should correctly compute abs() for a complex number with large real part and small imaginary part", () => {
    // When a >= 3000 and b < 3000, the original uses overflow-safe path
    // The mutated code incorrectly uses Math.sqrt(a*a + b*b) which overflows for very large a
    const largeReal = 1e200;
    const smallImag = 0;
    
    const c = new Complex(largeReal, smallImag);
    const result = c.abs();
    
    // Original code: uses overflow-safe calculation, returns 1e200
    // Mutated code: Math.sqrt(1e200 * 1e200 + 0) = Math.sqrt(Infinity) = Infinity
    expect(result).toBe(1e200);
    expect(isFinite(result)).toBe(true);
  });
});