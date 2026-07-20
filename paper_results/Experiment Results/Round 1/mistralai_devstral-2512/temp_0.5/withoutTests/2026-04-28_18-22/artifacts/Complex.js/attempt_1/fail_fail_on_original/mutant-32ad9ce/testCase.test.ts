// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-32ad9ce/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex number parsing with NaN handling", () => {
  it("should return NaN when only real part is NaN", () => {
    const result = new Complex(NaN, 0);
    expect(result.isNaN()).toBe(true);
  });
});