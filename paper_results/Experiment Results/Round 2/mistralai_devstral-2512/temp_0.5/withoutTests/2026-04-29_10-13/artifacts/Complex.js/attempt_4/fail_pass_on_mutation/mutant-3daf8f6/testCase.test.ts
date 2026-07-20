import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js logHypot mutation test", () => {
  it("should expose difference in logHypot calculation at boundary condition", () => {
    // Create a complex number where a = 3000 (the boundary)
    const c = new Complex(3000, 1000);
    const result = c.log();

    // The original code uses the optimized path (a < 3000)
    // The mutated code uses the fallback path (a <= 3000)
    // These should produce different results due to different calculation methods
    // We'll check against both possible calculation methods

    // Optimized path result (what original should produce)
    const optimizedRe = Math.log(Math.sqrt(3000*3000 + 1000*1000));

    // Fallback path result (what mutated would produce)
    const fallbackRe = 0.5 * Math.log(3000*3000 + 1000*1000) + Math.LN2;

    // The original should match the optimized path
    expect(result.re).toBeCloseTo(optimizedRe, 12);
    // Should NOT match the fallback path
    expect(Math.abs(result.re - fallbackRe)).toBeGreaterThan(1e-10);
  });
});