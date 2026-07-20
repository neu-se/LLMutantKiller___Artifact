// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ea120d1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.logHypot", () => {
  it("should use the optimized path when both values are below 3000", () => {
    const c = new Complex(2999, 2999);
    const result = c.log();
    const expectedRe = Math.log(Math.sqrt(2999 * 2999 + 2999 * 2999));
    expect(result.re).toBeCloseTo(expectedRe, 10);
  });
});