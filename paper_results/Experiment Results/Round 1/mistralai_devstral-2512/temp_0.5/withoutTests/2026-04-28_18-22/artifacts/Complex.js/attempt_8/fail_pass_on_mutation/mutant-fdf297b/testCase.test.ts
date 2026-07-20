// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-fdf297b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex subtraction with infinity", () => {
  it("should return Infinity when subtracting finite from infinity", () => {
    const infinity = Complex.INFINITY;
    const finite = new Complex(1, 0);
    const result = infinity.sub(finite);
    expect(result.isInfinite()).toBe(true);
    expect(result.isNaN()).toBe(false);
  });
});