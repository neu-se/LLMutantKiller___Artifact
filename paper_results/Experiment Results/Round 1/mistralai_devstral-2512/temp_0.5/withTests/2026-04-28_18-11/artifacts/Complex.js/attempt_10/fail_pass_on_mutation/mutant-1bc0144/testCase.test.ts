// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-1bc0144/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should produce consistent results for valid inputs", () => {
    const c1 = new Complex(0.5, 0);
    const c2 = new Complex(0.5, 0);
    const result1 = c1.asech();
    const result2 = c2.asech();
    expect(result1.equals(result2)).toBe(true);
  });
});