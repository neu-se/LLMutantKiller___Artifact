import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString negative zero imaginary part", () => {
  it("should handle negative zero imaginary part correctly", () => {
    const originalEpsilon = Complex['EPSILON'];
    Complex['EPSILON'] = 0; // Disable EPSILON zeroing
    
    const c = new Complex(3, 1);
    c['im'] = -0; // Set im to -0 directly
    
    // With EPSILON=0: Math.abs(-0) < 0 is FALSE, so b stays -0
    // if (b === 0): -0 === 0 is TRUE in JS -> early return fires -> "3"
    // Same in both versions
    
    Complex['EPSILON'] = originalEpsilon;
    expect(c.toString()).toBe("3");
  });
});