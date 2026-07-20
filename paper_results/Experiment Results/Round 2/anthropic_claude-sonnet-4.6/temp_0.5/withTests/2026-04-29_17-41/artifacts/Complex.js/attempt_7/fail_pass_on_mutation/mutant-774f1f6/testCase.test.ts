import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex logHypot boundary", () => {
  it("should compute abs correctly for numbers near the 3000 boundary in logHypot", () => {
    // logHypot has: if (_a < 3000 && _b <= 3000) - note <= vs <
    // This means when both are exactly 3000, it uses the simple formula
    const c = new Complex(3000, 3000);
    const result = c.abs();
    expect(result).toBeCloseTo(3000 * Math.sqrt(2), 5);
  });
});