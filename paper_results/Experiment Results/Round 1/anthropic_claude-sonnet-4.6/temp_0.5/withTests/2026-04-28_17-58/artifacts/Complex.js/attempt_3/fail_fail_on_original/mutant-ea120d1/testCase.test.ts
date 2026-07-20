import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot large value handling", () => {
  it("correctly computes log of complex number with very large imaginary part to avoid overflow", () => {
    // logHypot is used internally. For very large values (> 3000),
    // the divide-by-2 path prevents overflow in a*a + b*b.
    // The mutation changes _b < 3000 to _b <= 3000.
    // For b = 3000 exactly with a < 3000, original uses divide-by-2 path,
    // mutant uses direct path.
    // 
    // Test: use a value where a < 3000 and b = 3000 to trigger the boundary.
    // We verify the result matches the mathematically correct value.
    
    // For complex number (1 + 3000i), log has real part = logHypot(1, 3000)
    // = log(sqrt(1 + 9000000)) = log(sqrt(9000001)) ≈ log(3000.000166...)
    const expected = Math.log(Math.sqrt(1 + 3000 * 3000));
    
    const c = new Complex(1, 3000);
    const result = c.log();
    
    expect(result.re).toBeCloseTo(expected, 10);
    
    // More specifically, check the exact value matches the divide-by-2 path
    // which is what the original code uses for b=3000 (since _b < 3000 is false)
    // Original: a=0.5, b=1500 => 0.5*log(0.25 + 2250000) + LN2
    const originalResult = 0.5 * Math.log(0.5 * 0.5 + 1500 * 1500) + Math.LN2;
    // Mutated: log(1 + 9000000) * 0.5
    const mutatedResult = Math.log(1 + 9000000) * 0.5;
    
    // These should differ at floating point level
    expect(originalResult === mutatedResult).toBe(false);
    expect(result.re).toBe(originalResult);
  });
});