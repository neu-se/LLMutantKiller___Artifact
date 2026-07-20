// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3daf8f6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot mutation test", () => {
  it("should correctly handle the boundary case where a = 3000 and b = 1", () => {
    const c = new Complex(3000, 1);
    const result = c.log();
    // The original code uses the alternative formula for large values
    // The mutated code with <= will use the direct formula
    // These should produce different results
    const expectedRe = Math.log(3000) + Math.log(1 + (1/3000) * (1/3000)) * 0.5;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(Math.atan2(1, 3000), 10);
  });
});