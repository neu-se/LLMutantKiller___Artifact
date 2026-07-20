// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-12d80c9/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech", () => {
  it("should handle edge case where a and b are both zero", () => {
    const c = new Complex(0, 0);
    const result = c.asech();
    expect(result.isInfinite()).toBe(true);
  });
});