import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex equals method boundary condition", () => {
  it("should return true when the difference between real parts is exactly EPSILON", () => {
    const epsilon = Complex['EPSILON']; // 1e-15
    // Create two complex numbers where the real part difference is exactly epsilon
    // Use 0 and epsilon directly to ensure exact floating point representation
    const c1 = new Complex(0, 0);
    const c2 = new Complex(epsilon, 0);
    // In original code: Math.abs(epsilon - 0) <= epsilon => true
    // In mutated code: Math.abs(epsilon - 0) < epsilon => false (since epsilon is not strictly less than epsilon)
    expect(c1.equals(c2)).toBe(true);
  });
});