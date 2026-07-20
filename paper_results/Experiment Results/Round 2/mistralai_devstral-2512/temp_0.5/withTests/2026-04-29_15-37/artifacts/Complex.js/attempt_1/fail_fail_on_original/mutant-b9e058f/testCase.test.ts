// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-b9e058f/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex addition with infinity", () => {
  it("should return NaN when adding two infinite complex numbers", () => {
    const infinity = Complex.INFINITY;
    const result = infinity.add(infinity);
    expect(result.isNaN()).toBe(true);
  });
});