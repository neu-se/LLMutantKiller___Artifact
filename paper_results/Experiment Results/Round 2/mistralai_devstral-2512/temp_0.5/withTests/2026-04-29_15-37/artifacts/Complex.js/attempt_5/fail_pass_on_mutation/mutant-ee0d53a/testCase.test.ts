// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ee0d53a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot function", () => {
  it("should use the correct calculation path for values where a >= 3000", () => {
    // This test specifically targets the mutation by using a value where a >= 3000
    // The mutation changes the condition from (a < 3000 && b < 3000) to (true && b < 3000)
    // This means the optimized path will be taken even when a >= 3000, which could cause overflow
    const c = new Complex(4000, 1000);
    const absValue = c.abs();
    const expected = Math.sqrt(4000*4000 + 1000*1000);
    expect(absValue).toBeCloseTo(expected);
  });
});