// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ea120d1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.logHypot mutation test", () => {
  it("should correctly handle edge case where b equals 3000", () => {
    const a = 2999;
    const b = 3000;
    const c = new Complex(a, b);
    const result = c.log();
    const expected = Math.log(Math.sqrt(a * a + b * b));
    expect(result.re).toBeCloseTo(expected, 10);
  });
});