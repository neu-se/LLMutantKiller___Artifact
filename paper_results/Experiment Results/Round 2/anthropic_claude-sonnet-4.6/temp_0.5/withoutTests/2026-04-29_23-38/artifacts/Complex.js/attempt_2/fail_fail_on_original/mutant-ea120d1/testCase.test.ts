import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot boundary condition at _b === 3000", () => {
  it("uses the safe computation path when |imaginary| equals exactly 3000 and |real| < 3000", () => {
    // logHypot(a, b) is called by log()
    // For a=1, b=3000: _a=1 < 3000, _b=3000
    // Original code: _b < 3000 is FALSE → falls through to safe path
    //   a = 0.5, b = 1500
    //   result = 0.5 * Math.log(0.25 + 2250000) + Math.LN2
    // Mutated code: _b <= 3000 is TRUE → takes fast path
    //   result = Math.log(1 + 9000000) * 0.5
    
    const a = 1, b = 3000;
    const safePathResult = 0.5 * Math.log((a / 2) * (a / 2) + (b / 2) * (b / 2)) + Math.LN2;
    const fastPathResult = Math.log(a * a + b * b) * 0.5;
    
    // These should differ by at least 1 ULP due to different floating point operations
    // If they're equal, the mutation is undetectable - but we expect them to differ
    const result = new Complex(a, b).log();
    
    expect(result.re).toBe(safePathResult);
    expect(result.re).not.toBe(fastPathResult);
  });
});