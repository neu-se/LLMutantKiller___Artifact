// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-fdf297b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex subtraction with infinity", () => {
  it("should return NaN when subtracting infinity from infinity", () => {
    const infinity = Complex.INFINITY;
    const result = infinity.sub(infinity);
    expect(result.isNaN()).toBe(true);
  });
});