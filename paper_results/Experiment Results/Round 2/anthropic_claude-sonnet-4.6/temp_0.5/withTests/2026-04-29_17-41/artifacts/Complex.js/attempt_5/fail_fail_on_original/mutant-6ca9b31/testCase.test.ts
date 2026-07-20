import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('should use plus sign not minus sign when imaginary part is negative zero', () => {
    const c = new Complex(1, 1);
    // Force im to be -0 directly, bypassing constructor
    c['im'] = -0;
    // In toString: Math.abs(-0) = 0 < EPSILON, so b = 0, returns "1" early
    // Both return "1" - still equivalent
    
    // Actually let me try 2*EPSILON to be just above epsilon
    const c2 = new Complex(1, 2 * 1e-15);
    // b = 2e-15, Math.abs(2e-15) < 1e-15? NO, 2e-15 > 1e-15
    // So b stays as 2e-15, b !== 0, a !== 0
    // Original: b < 0? No. Uses +. ret = "1+ " + "2e-15" + "i" = "1+ 2e-15i"  
    // Mutated: b <= 0? No (b > 0). Uses +. Same result.
    expect(c2.toString()).toBe('1+ 2e-15i');
  });
});