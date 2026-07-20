// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0fdda52/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.js hypot function mutation test", () => {
  it("should correctly compute hypot for large values where a >= b", () => {
    // This test targets the mutation in the hypot function where the condition was changed from a < b to a >= b
    // We test with values where a >= b to ensure the correct branch is taken
    const c = new Complex(4000, 3000);
    const absValue = c.abs();
    // The correct hypot calculation for (4000, 3000) should be 5000
    expect(absValue).toBe(5000);
  });
});