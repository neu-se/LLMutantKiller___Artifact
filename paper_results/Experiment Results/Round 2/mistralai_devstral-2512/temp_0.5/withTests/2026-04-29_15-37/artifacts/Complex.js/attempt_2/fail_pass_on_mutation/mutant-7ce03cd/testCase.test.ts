// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-7ce03cd/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication edge cases", () => {
  it("should return NaN when multiplying Infinity by zero", () => {
    const infinity = Complex.INFINITY;
    const zero = new Complex(0, 0);
    const result = infinity.mul(zero);
    expect(result.isNaN()).toBe(true);
  });
});