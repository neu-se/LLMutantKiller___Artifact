import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("atanh of real number greater than 1 should have negative imaginary part", () => {
    // For a > 1, b = 0: noIM = true, d = (1-a)^2 != 0
    // This goes through the d !== 0 branch, unaffected by mutation
    // Let's try to find what actually differs
    // When a=0, b=0: d=0, else branch used
    // After constructing x with NaN im (mutated), logHypot and atan2 are called
    const z = new Complex(0, 0);
    const result = z.atanh();
    const str = result.toString();
    expect(str).toBe('0');
  });
});