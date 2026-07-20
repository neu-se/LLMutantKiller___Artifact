// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-614ba77/testCase.test.ts
import Complex from "./complex.js";

describe("Complex.js module exports", () => {
  it("should have the correct default export", () => {
    // This test checks that the default export is correctly set to Complex
    // The mutation changes Complex['default'] to Complex[""] which breaks the default export
    expect(Complex).toBeDefined();
    expect(Complex.default).toBe(Complex);
  });
});