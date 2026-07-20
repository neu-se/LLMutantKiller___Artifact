// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-069e426/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should handle edge case when real part is zero and imaginary part is non-zero", () => {
    const c = new Complex(0, 1);
    const result = c.asec();
    expect(result.isInfinite()).toBe(true);
  });
});