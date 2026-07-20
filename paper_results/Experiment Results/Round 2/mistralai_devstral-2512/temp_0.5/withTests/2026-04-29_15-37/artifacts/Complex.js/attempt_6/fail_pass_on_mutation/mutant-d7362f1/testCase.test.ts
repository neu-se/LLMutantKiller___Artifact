// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d7362f1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication optimization", () => {
  it("should use optimized multiplication for real numbers", () => {
    const a = new Complex(5, 0);
    const b = new Complex(3, 0);
    const result = a.mul(b);
    expect(result.re).toBe(15);
    expect(result.im).toBe(0);
    // The mutant will fail here because accessing this[""] returns undefined
    // which breaks the optimization condition and causes NaN in the result
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});