import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex logHypot boundary condition", () => {
  it("computes log correctly for a complex number where |im| equals 3000 and |re| is small", () => {
    // The mutation changes _b < 3000 to _b <= 3000 in logHypot
    // When _a < 3000 and _b === 3000:
    // Original: condition false, uses divide-by-2 path: a/=2, b/=2, return 0.5*log(a*a+b*b)+LN2
    // Mutated:  condition true,  uses direct path: return log(a*a+b*b)*0.5
    //
    // For a=2999.9999999, b=3000:
    // Direct:   log(2999.9999999^2 + 3000^2) * 0.5
    // Div2:     0.5*log(1499.99999995^2 + 1500^2) + LN2
    // These are mathematically equal but may differ in floating point
    
    // Try a value where floating point differences emerge
    // a = 2^52 * epsilon type values...
    // Actually let's use a=1e-10, b=3000
    // Direct:   log(1e-20 + 9000000) * 0.5
    // Div2:     0.5*log(2.5e-22 + 2250000) + LN2
    
    const a = 1e-10;
    const b = 3000;
    
    const directPath = Math.log(a * a + b * b) * 0.5;
    const divBy2Path = 0.5 * Math.log((a/2) * (a/2) + (b/2) * (b/2)) + Math.LN2;
    
    // Check if they differ
    console.log('direct:', directPath);
    console.log('divBy2:', divBy2Path);
    console.log('equal:', directPath === divBy2Path);
    
    const c = new Complex(a, b);
    const result = c.log();
    
    // The result should be log(sqrt(a^2 + b^2)) ≈ log(3000)
    const trueValue = 0.5 * Math.log(a * a + b * b);
    expect(result.re).toBeCloseTo(trueValue, 14);
  });
});