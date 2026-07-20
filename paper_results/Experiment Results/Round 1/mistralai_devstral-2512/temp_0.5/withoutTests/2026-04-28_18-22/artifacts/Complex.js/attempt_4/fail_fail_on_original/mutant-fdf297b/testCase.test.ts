// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-fdf297b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex subtraction with infinity", () => {
  it("should return NaN when subtracting infinity from a finite number", () => {
    const finite = new Complex(5, 3);
    const infinity = Complex.INFINITY;
    const result = finite.sub(infinity);
    expect(result.isNaN()).toBe(true);
  });
});