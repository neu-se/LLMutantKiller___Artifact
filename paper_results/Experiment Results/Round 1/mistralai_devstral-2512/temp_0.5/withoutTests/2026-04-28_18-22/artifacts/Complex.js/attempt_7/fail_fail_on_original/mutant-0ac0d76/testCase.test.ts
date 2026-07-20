// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0ac0d76/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should correctly compute log for positive real numbers and fail on mutation", () => {
    const c = new Complex(2.71828, 0); // e
    const result = c.log();
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBe(0);
  });
});