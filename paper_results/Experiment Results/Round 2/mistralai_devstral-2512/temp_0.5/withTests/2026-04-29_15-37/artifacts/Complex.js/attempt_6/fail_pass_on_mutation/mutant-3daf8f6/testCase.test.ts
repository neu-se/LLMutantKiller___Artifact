// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3daf8f6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot mutation test", () => {
  it("should correctly handle the boundary case where a = 3000 and b = 1", () => {
    const c = new Complex(3000, 1);
    const result = c.log();
    // The original code uses the direct formula (Math.log(a * a + b * b) * 0.5)
    // The mutated code with <= will use the alternative formula
    expect(result.re).toBeCloseTo(Math.log(3000 * 3000 + 1 * 1) * 0.5, 10);
    expect(result.im).toBeCloseTo(Math.atan2(1, 3000), 10);
  });
});