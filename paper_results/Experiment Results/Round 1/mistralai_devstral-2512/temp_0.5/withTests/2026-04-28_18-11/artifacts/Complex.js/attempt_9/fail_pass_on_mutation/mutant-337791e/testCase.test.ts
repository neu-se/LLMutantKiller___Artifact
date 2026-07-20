// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-337791e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.exp()", () => {
  it("should return NaN for NaN input", () => {
    const c = new Complex(NaN, 0);
    const result = c.exp();
    expect(result.isNaN()).toBe(true);
  });
});