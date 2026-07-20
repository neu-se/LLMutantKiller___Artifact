// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ab6cfbe/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should return NaN for log(0) when a is exactly 0", () => {
    const result = new Complex(0, 0).log();
    expect(result.isNaN()).toBe(true);
  });
});