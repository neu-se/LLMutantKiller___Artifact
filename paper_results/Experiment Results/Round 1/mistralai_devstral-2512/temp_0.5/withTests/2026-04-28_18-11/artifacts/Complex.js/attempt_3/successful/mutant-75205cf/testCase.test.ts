// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-75205cf/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex subtraction with infinity", () => {
  it("should return Infinity when subtracting finite from infinite", () => {
    const infinity = Complex.INFINITY;
    const finite = new Complex(1, 1);
    const result = infinity.sub(finite);
    expect(result.isInfinite()).toBe(true);
  });
});