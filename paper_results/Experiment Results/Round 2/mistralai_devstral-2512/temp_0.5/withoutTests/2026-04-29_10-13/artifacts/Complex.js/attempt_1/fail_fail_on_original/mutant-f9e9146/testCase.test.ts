// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f9e9146/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex module exports", () => {
  it("should have __esModule property set to true", () => {
    // This test verifies the __esModule property which is directly affected by the mutation
    // The mutation changes it from true to false, which will cause this test to fail
    expect((Complex as any).__esModule).toBe(true);
  });
});