// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-606c6f1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.add", () => {
  it("should return Infinity when adding a finite complex number to Infinity", () => {
    const finite = new Complex(1, 1);
    const infinite = Complex.INFINITY;
    const result = finite.add(infinite);
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
    expect(result.isInfinite()).toBe(true);
  });
});