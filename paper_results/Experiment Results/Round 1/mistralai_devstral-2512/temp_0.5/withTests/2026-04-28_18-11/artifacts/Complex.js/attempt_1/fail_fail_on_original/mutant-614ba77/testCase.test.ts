// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-614ba77/testCase.test.ts
import Complex from "./complex.js";

describe("Complex.js module exports", () => {
  it("should have Complex as the default export", () => {
    // This test verifies that the default export is Complex
    // The mutation changes Complex['default'] to Complex[""] which breaks the default export
    expect(Complex.default).toBe(Complex);
  });
});