// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-c3d4345/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should return Infinity for (0, 0) input", () => {
    const result = new Complex(0, 0).asec();
    expect(result.isInfinite()).toBe(true);
  });
});