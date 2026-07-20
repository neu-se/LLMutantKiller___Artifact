// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-b9e058f/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number addition with infinity", () => {
  it("should return Infinity when adding a finite number to an infinite complex number", () => {
    const infinity = Complex.INFINITY;
    const finite = new Complex(5, 3);
    const result = infinity.add(finite);
    expect(result.isInfinite()).toBe(true);
  });
});