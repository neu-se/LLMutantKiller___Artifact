// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-b9e058f/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex addition with infinity", () => {
  it("should return Infinity when adding one infinite and one finite complex number", () => {
    const infinity = Complex.INFINITY;
    const finite = new Complex(1, 1);
    const result = infinity.add(finite);
    expect(result.isInfinite()).toBe(true);
  });
});