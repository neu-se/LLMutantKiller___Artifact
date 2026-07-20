import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot boundary condition at _b === 3000", () => {
  it("should compute log correctly when imaginary part is exactly 3000", () => {
    // When b = 3000 and a is small, the original code uses the safe path
    // while the mutated code uses the fast path, giving different results
    const c = new Complex(1, 3000);
    const result = c.log();
    
    // The accurate value: logHypot(1, 3000) = log(sqrt(1 + 9000000)) = log(sqrt(9000001))
    const expected = Math.log(Math.sqrt(9000001));
    
    expect(result.re).toBeCloseTo(expected, 10);
  });
});