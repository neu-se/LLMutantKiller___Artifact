// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-fdf297b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex subtraction with infinity", () => {
  it("should return NaN when subtracting one finite and one infinite complex number", () => {
    const finite = new Complex(1, 1);
    const infinity = Complex.INFINITY;
    const result = finite.sub(infinity);
    expect(result.isNaN()).toBe(true);
  });
});