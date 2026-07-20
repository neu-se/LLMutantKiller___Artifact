import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js logHypot mutation test", () => {
  it("should expose difference in logHypot calculation for a = 3000 and b = 2000", () => {
    const c = new Complex(3000, 2000);
    const result = c.log();

    // Calculate what the optimized path would produce (a < 3000)
    const optimizedRe = Math.log(Math.sqrt(3000*3000 + 2000*2000));

    // Calculate what the fallback path would produce (a <= 3000)
    const fallbackRe = 0.5 * Math.log(3000*3000 + 2000*2000) + Math.LN2;

    // The original code should use optimized path (a < 3000 is false)
    // The mutated code would use fallback path (a <= 3000 is true)
    // So original should match fallback, not optimized
    expect(result.re).toBeCloseTo(fallbackRe, 12);
    expect(Math.abs(result.re - optimizedRe)).toBeGreaterThan(1e-10);
  });
});