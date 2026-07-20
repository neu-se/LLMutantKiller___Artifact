// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-c3d345/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should return a finite value for asec(1)", () => {
    const result = new Complex(1, 0).asec();
    expect(result.isFinite()).toBe(true);
  });
});