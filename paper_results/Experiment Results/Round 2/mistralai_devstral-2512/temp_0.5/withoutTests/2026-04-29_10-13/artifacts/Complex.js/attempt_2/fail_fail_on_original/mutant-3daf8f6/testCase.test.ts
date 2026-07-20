import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js logHypot mutation test", () => {
  it("should correctly compute logHypot for values at the boundary of the optimization condition", () => {
    const c = new Complex(3000, 1);
    const result = c.log();
    // The original code should use the optimized path (a < 3000 && b < 3000)
    // The mutated code would use the fallback path (a <= 3000 && b < 3000)
    // This should produce different results due to different calculation methods
    expect(result.re).toBeCloseTo(8.006367567650246, 10);
    expect(result.im).toBeCloseTo(Math.atan2(1, 3000), 10);
  });
});