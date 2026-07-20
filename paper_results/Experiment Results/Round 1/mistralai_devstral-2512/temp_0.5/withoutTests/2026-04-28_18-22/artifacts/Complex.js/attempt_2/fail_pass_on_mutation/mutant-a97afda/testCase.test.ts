// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a97afda/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("should correctly handle the case when b === 1", () => {
    const c = new Complex(0, 1);
    const result = c.atan();
    // The original code has a special case for b === 1 that the mutant removes
    // This test verifies that the special case is handled correctly
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Infinity, 10);
  });
});