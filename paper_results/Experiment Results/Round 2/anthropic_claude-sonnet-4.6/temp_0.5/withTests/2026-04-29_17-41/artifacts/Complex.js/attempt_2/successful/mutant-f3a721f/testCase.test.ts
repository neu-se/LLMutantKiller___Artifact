import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex equals method boundary condition", () => {
  it("should return true when two complex numbers are exactly EPSILON apart (boundary of equality)", () => {
    const epsilon = Complex['EPSILON']; // 1e-15
    // Construct c1 and c2 such that c2.re - c1.re is exactly epsilon
    // by using 0 and epsilon directly
    const c1 = new Complex(0, 0);
    const c2 = new Complex(epsilon, 0);
    // Original uses <=: Math.abs(epsilon - 0) <= epsilon => true
    // Mutant uses <:  Math.abs(epsilon - 0) < epsilon  => false
    expect(c1.equals(c2)).toBe(true);
  });
});