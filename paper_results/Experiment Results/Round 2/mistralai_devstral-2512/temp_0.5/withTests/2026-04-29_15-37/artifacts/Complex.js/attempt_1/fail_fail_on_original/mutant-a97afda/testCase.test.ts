// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a97afda/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.atan", () => {
  it("should correctly handle the case when the imaginary part is 1", () => {
    const c = new Complex(0, 1);
    const result = c.atan();
    // The original code has a special case for b === 1 that returns early
    // The mutated code changes this to if (true), which would always trigger
    // This test verifies the correct behavior when b === 1
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Infinity);
  });
});