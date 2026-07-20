// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-606c6f1/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.add", () => {
  it("should return Infinity when adding a finite complex number to Infinity", () => {
    const finite = new Complex(1, 2);
    const infinite = Complex.INFINITY;
    const result = finite.add(infinite);
    expect(result.isInfinite()).toBe(true);
  });
});