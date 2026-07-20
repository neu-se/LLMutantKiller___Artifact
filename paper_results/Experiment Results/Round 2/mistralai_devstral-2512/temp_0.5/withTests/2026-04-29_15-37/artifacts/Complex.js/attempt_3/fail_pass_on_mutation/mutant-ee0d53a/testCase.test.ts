// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ee0d53a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot function", () => {
  it("should correctly compute hypot for values where a >= 3000", () => {
    const c = new Complex(3500, 1000);
    const absValue = c.abs();
    const expected = Math.sqrt(3500 * 3500 + 1000 * 1000);
    expect(absValue).toBeCloseTo(expected);
  });
});