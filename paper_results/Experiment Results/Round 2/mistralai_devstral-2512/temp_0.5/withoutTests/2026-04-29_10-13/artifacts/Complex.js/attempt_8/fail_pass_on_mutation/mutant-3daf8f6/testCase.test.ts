import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js logHypot mutation test", () => {
  it("should correctly handle the boundary case where a = 2999 and b = 2999", () => {
    const c = new Complex(2999, 2999);
    const result = c.log();
    // For a=2999 and b=2999, both original and mutated code should use the optimized path
    // since 2999 < 3000 in both cases
    const expectedRe = Math.log(Math.sqrt(2999*2999 + 2999*2999));
    expect(result.re).toBeCloseTo(expectedRe, 12);
    expect(result.im).toBeCloseTo(Math.atan2(2999, 2999), 12);
  });
});