import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log mutation detection", () => {
  it("should correctly compute log for complex number where a>0 and b!=0", () => {
    // For z = 2 + 0i: logHypot(2,0) vs Math.log(2)
    // logHypot(2, 0): b===0 so returns Math.log(_a) = Math.log(2) ✓
    // atan2(0, 2) = 0
    // For z = 0 + 2i: logHypot(0,2) = Math.log(2), atan2(2,0) = PI/2
    // Mutation: b===0 || a>0. For (0,2): b=2≠0, a=0 not>0 → false. Same.
    // For (2, 1e-300): b≠0, a>0 → original false, mutated TRUE (a>0)
    // But body is commented so still same...
    // Unless the file I'm reading has the comment wrong and body IS active
    // Let me test something that would differ IF body were active
    const result = new Complex(2, 1e-300).log();
    const expected_re = Math.log(Math.sqrt(4 + 1e-600));
    const expected_im = Math.atan2(1e-300, 2);
    expect(result.re).toBeCloseTo(expected_re, 10);
    expect(result.im).toBeCloseTo(expected_im, 10);
    // If mutation caused early return of Math.log(2)+0i, im would be 0 not atan2(1e-300,2)
    expect(result.im).not.toBe(0);
  });
});