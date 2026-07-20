import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs with large real part", () => {
  it("should correctly compute abs when real part is very large (>= 3000) and imaginary part is small", () => {
    // With a = 1e200 and b = 1, the simple sqrt(a*a + b*b) overflows to Infinity
    // The overflow-safe path should return approximately 1e200
    const c = new Complex(1e200, 1);
    const result = c.abs();
    
    // The correct result should be approximately 1e200 (not Infinity)
    expect(result).toBeCloseTo(1e200, -190);
    expect(result).not.toBe(Infinity);
  });
});