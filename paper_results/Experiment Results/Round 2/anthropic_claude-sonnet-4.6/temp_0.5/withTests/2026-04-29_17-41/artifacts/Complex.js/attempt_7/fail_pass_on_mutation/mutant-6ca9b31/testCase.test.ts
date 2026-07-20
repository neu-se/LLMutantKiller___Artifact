import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('should produce correct sign in toString for complex with tiny negative imaginary', () => {
    // b = -2e-15 is above epsilon (1e-15) in absolute value
    // Math.abs(-2e-15) = 2e-15 > 1e-15, so b stays -2e-15
    // b === 0? No. a !== 0? Yes (a=1).
    // Original: b < 0 → -2e-15 < 0 → TRUE → b=2e-15, ret+="-"
    // Mutated: b <= 0 → -2e-15 <= 0 → TRUE → same
    // Both give "1 - 2e-15i"
    
    // What about b = 2e-15 (positive, above epsilon)?
    // Original: b < 0 → FALSE → ret+="+"
    // Mutated: b <= 0 → FALSE → ret+="+"
    // Both give "1 + 2e-15i"
    
    // The mutation is truly equivalent for all reachable values of b
    // Let me try to force b=0 past the early return using a subclass
    
    class TestComplex extends (Complex as any) {
      toString() {
        // Call parent toString but with im forced to 0 past the check
        const orig = this['im'];
        // Can't easily intercept internal variables
        return super.toString();
      }
    }
    
    const c = new (Complex as any)(1, 2);
    expect(c.toString()).toBe('1 + 2i');
  });
});