// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ed38344/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex subtraction edge case", () => {
  it("should return Infinity when subtracting finite from Infinity", () => {
    const infinity = Complex.INFINITY;
    const finite = new Complex(5, 3);
    const result = infinity.sub(finite);
    expect(result.isInfinite()).toBe(true);
  });
});