// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ea120d1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.logHypot", () => {
  it("should correctly handle edge case where b equals exactly 3000", () => {
    const c = new Complex(1, 3000);
    const result = c.log();
    const expectedRe = Math.log(Math.sqrt(1 * 1 + 3000 * 3000));
    expect(result.re).toBeCloseTo(expectedRe, 10);
  });
});