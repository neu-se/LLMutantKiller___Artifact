// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f6c62b3/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.js module exports", () => {
  it("should have __esModule property set to true", () => {
    // This test checks if the __esModule property is correctly defined
    // The mutation changes the property name from "__esModule" to ""
    expect(Complex).toHaveProperty("__esModule");
    expect(Complex.__esModule).toBe(true);
  });
});