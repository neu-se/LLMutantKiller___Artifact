import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc method", () => {
  it("should return a finite result for acsc(1) (non-zero real input), not the infinity result for zero input", () => {
    // The mutation changes `if (a === 0 && b === 0)` to `if (a === 0 && true)`
    // This means any complex number with a === 0 (including purely imaginary numbers)
    // will incorrectly return new Complex(Math.PI / 2, Infinity) instead of computing normally
    // 
    // For acsc(1) = asin(1/1) = asin(1) = PI/2, result should be (PI/2, 0)
    // With the mutation, acsc(1) has a=1, b=0, so it won't be affected
    // 
    // For acsc(i) where input is purely imaginary (a=0, b=1):
    // Original: a=0, b=1, condition (0===0 && 1===0) is false, so it computes normally
    // Mutated: a=0, b=1, condition (0===0 && true) is true, so it returns Complex(PI/2, Infinity)
    
    const result = new Complex(0, 1).acsc();
    
    // The result should be finite (not infinity) for a non-zero input
    // acsc(i) = asin(1/i) = asin(-i) which should give a finite complex number
    expect(result.isInfinite()).toBe(false);
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});