// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-47cd04d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.add", () => {
  it("should return Infinity when adding a finite and an infinite complex number", () => {
    const finite = new Complex(1, 2);
    const infinity = Complex.INFINITY;
    const result = finite.add(infinity);
    expect(result.isInfinite()).toBe(true);
  });
});