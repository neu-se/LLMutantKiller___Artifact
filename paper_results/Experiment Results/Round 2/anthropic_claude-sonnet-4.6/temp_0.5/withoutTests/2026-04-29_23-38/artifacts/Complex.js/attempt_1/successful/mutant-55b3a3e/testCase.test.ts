import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc method", () => {
  it("should return a finite result for a non-zero real input like acsc(2)", () => {
    // acsc(2) = asin(1/2) = π/6 ≈ 0.5235987755982988
    // With the mutation: if (a === 0 && true) always triggers when a === 0,
    // but more critically, when a !== 0 (e.g., a=2, b=0), the condition
    // `if (a === 0 && true)` evaluates to false (since a=2 !== 0),
    // so the mutation doesn't affect this case directly.
    // 
    // The mutation changes `if (a === 0 && b === 0)` to `if (a === 0 && true)`,
    // meaning any complex number with a === 0 (even if b !== 0) will return
    // new Complex(Math.PI / 2, Infinity) instead of computing the correct result.
    //
    // Test: acsc(i) should NOT return (π/2, Infinity)
    // acsc(i) = asin(1/i) = asin(-i) 
    // With original code: a=0, b=1, condition `a===0 && b===0` is false, computes normally
    // With mutated code: a=0, b=1, condition `a===0 && true` is true, returns (π/2, Infinity)
    
    const result = new Complex(0, 1).acsc();
    
    // The result should be finite (not Infinity) for acsc(i)
    // acsc(i) = -i * log(i/i + sqrt(1 - 1/i^2)) = -i * log(1 + sqrt(1+1)) = -i * log(1 + sqrt(2))
    // The imaginary part should NOT be Infinity
    expect(isFinite(result.im)).toBe(true);
    expect(result.im).not.toBe(Infinity);
  });
});