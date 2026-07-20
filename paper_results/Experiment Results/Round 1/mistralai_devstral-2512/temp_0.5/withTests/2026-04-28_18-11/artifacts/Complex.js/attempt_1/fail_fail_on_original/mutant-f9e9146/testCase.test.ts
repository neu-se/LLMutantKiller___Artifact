// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f9e9146/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.js module exports", () => {
  it("should have __esModule property set to true", () => {
    // This test checks the __esModule property which should be true in the original
    // but will be false in the mutated version, causing the test to fail
    expect((Complex as any).__esModule).toBe(true);
  });
});