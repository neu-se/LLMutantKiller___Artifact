// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-fdf297b/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex subtraction with infinity", () => {
  it("should return NaN when subtracting two infinite complex numbers", () => {
    const infinity = Complex.INFINITY;
    const result = infinity.sub(infinity);
    expect(result.isNaN()).toBe(true);
  });
});