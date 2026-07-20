import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js logHypot mutation test", () => {
  it("should correctly compute log for complex number with a=3000 and b=1 using optimized path", () => {
    const c = new Complex(3000, 1);
    const result = c.log();

    // The original code uses Math.sqrt for a < 3000 (false, so uses fallback)
    // The mutated code uses fallback for a <= 3000 (true, so uses fallback)
    // Both should produce the same result using the fallback calculation
    const expectedRe = 0.5 * Math.log(3000*3000 + 1*1) + Math.LN2;
    expect(result.re).toBeCloseTo(expectedRe, 12);
    expect(result.im).toBeCloseTo(Math.atan2(1, 3000), 12);
  });
});