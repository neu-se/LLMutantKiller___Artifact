import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('logHypot boundary condition at _a === 3000', () => {
  it('uses the correct code path when abs(re) is exactly 3000', () => {
    // When a=3000, b=1: _a=3000, _b=1
    // Original: _a < 3000 is false → else branch (safe path with halving)
    // Mutated: _a <= 3000 is true AND _b < 3000 is true → if branch (direct path)
    const a = 3000;
    const b = 1;
    
    const directPath = Math.log(a * a + b * b) * 0.5;
    const safePath = 0.5 * Math.log((a / 2) * (a / 2) + (b / 2) * (b / 2)) + Math.LN2;
    
    // Verify the two paths actually give different floating point results
    // (otherwise this test can't distinguish them)
    expect(directPath).not.toBe(safePath);
    
    const result = new Complex(a, b).log();
    // Original should use safe path
    expect(result.re).toBe(safePath);
  });
});