// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a6245b5/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should handle division by zero in atanh when b=0 and a=-1", () => {
    const result = new Complex(-1, 0).atanh();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});