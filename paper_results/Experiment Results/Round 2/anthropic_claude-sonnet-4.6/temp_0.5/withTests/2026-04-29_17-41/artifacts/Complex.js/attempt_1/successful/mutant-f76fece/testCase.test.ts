import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex equals method", () => {
  it("should return true when imaginary difference is exactly equal to EPSILON", () => {
    // The mutation changes <= to < for the imaginary part comparison
    // So we need a case where |z.im - this.im| === EPSILON exactly
    // Original: <= EPSILON returns true
    // Mutated: < EPSILON returns false
    
    const epsilon = Complex['EPSILON']; // 1e-15
    
    // Create two complex numbers where the real parts are equal
    // and the imaginary parts differ by exactly EPSILON
    const c1 = new Complex(1, 0);
    const c2 = new Complex(1, epsilon);
    
    // With original code (<=): Math.abs(epsilon - 0) <= epsilon => true
    // With mutated code (<): Math.abs(epsilon - 0) < epsilon => false
    expect(c1.equals(c2)).toBe(true);
  });
});