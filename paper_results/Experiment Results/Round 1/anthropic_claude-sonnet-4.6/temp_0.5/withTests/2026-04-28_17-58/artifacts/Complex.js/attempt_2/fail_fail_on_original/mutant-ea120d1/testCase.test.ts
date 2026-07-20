import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot boundary condition at b=3000", () => {
  it("should use the correct code path when imaginary part is exactly 3000 and real part is large", () => {
    // When _b === 3000 and _a >= 3000:
    // Original: _b < 3000 is false => condition false => else branch (divide by 2)
    // Mutated: _b <= 3000 is true but _a < 3000 is false => condition still false => else branch
    // 
    // When _b === 3000 and _a < 3000 (e.g., a=2999):
    // Original: _a < 3000 is true but _b < 3000 is false => condition false => else branch
    // Mutated: _a < 3000 is true and _b <= 3000 is true => condition true => if branch
    //
    // For a=2999, b=3000:
    // Original else branch: a=1499.5, b=1500, result = 0.5*log(1499.5^2 + 1500^2) + LN2
    // Mutated if branch: result = log(2999^2 + 3000^2) * 0.5
    
    const a = 2999;
    const b = 3000;
    
    const originalPath = 0.5 * Math.log((a/2) * (a/2) + (b/2) * (b/2)) + Math.LN2;
    const mutatedPath = Math.log(a * a + b * b) * 0.5;
    
    // Verify the paths give different results
    // If they're the same, the test won't be useful
    const c = new Complex(a, b);
    const result = c.log();
    
    // On original code, result.re should equal originalPath
    // On mutated code, result.re should equal mutatedPath
    expect(result.re).toBe(originalPath);
    expect(result.re).not.toBe(mutatedPath);
  });
});