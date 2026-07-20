import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('should return real number string when imaginary part rounds to zero', () => {
    // A complex where im is exactly at epsilon boundary
    // EPSILON = 1e-15, so im = 1e-15 is NOT < epsilon (equal, not less)
    // Math.abs(1e-15) < 1e-15 is FALSE, so b stays 1e-15
    // b === 0? No. a !== 0 (a=1)? Yes.
    // Original: 1e-15 < 0? No → uses +
    // Mutated: 1e-15 <= 0? No → uses +
    // Same result.
    
    // What about im = -1e-15?
    // Math.abs(-1e-15) = 1e-15, 1e-15 < 1e-15 is FALSE, b stays -1e-15
    // b === 0? No. a !== 0? Yes.
    // Original: -1e-15 < 0? YES → b=1e-15, ret+="-"
    // Mutated: -1e-15 <= 0? YES → same
    // Both produce "1 - 1e-15i"
    
    // The mutation is truly equivalent for all standard inputs
    // Let me try the boundary: im = 0 (exactly)
    // This always returns early as "1"
    
    // I'll try to use a number that computes to exactly 0 for im
    // through floating point arithmetic, but arrives as -0
    const c = new Complex(1, -1 * 0); // -1 * 0 = -0 in JS
    // im = -0, Math.abs(-0) = 0 < 1e-15, b = 0, returns "1"
    expect(c.toString()).toBe('1');
  });
});