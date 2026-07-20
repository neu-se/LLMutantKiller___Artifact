import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js logHypot mutation test", () => {
  it("should expose difference in logHypot calculation for a = 3000 and b = 1", () => {
    const c = new Complex(3000, 1);
    const result = c.log();

    // The original code should use Math.sqrt (since 3000 is not < 3000)
    // The mutated code would use the fallback (since 3000 <= 3000)
    // These produce different results

    // Calculate what original should produce (using Math.sqrt)
    const originalExpected = Math.log(Math.sqrt(3000*3000 + 1*1));

    // Calculate what mutated would produce (using fallback)
    const mutatedExpected = 0.5 * Math.log(3000*3000 + 1*1) + Math.LN2;

    // Original should match the sqrt version
    expect(result.re).toBeCloseTo(originalExpected, 12);
    // And should NOT match the fallback version
    expect(Math.abs(result.re - mutatedExpected)).toBeGreaterThan(1e-10);
  });
});