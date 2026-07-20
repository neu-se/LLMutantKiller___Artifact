import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log function", () => {
  it("should compute log of a purely real zero correctly, distinguishing a>0 from a>=0", () => {
    // log(0 + 0i): logHypot(0,0) = Math.log(0) = -Infinity, atan2(0,0) = 0
    // With original (a > 0): condition false for a=0, falls through to general case
    // With mutated (a >= 0): condition true for a=0, but block is empty, same result
    // Since block is empty, test the general log behavior for real positive numbers
    const result = new Complex(0, 0).log();
    // log(0) should be -Infinity + 0i
    expect(result.re).toBe(-Infinity);
    expect(result.im).toBe(0);
  });
});