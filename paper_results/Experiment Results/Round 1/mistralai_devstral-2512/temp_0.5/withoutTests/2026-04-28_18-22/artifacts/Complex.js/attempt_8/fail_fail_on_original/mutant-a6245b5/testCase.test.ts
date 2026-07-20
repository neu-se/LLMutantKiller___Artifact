// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a6245b5/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should handle the specific case where a=-1 and b=0 differently from a=-1 and b≠0", () => {
    const result1 = new Complex(-1, 0).atanh();
    const result2 = new Complex(-1, 0.0001).atanh();
    expect(result1.im).toBeGreaterThan(result2.im);
  });
});