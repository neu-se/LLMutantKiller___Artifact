// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-fdf297b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex subtraction edge cases", () => {
  it("should return NaN when subtracting finite from infinity (mutant detection)", () => {
    const infinity = Complex.INFINITY;
    const finite = new Complex(1, 0);
    const result = finite.sub(infinity);
    expect(result.isNaN()).toBe(true);
  });
});