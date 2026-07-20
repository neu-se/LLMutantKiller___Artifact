// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-47cd04d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.add", () => {
  it("should handle addition of infinite and finite complex numbers correctly", () => {
    const finite = new Complex(1, 1);
    const infinite = new Complex(Infinity, 0);
    const result = finite.add(infinite);
    expect(result.isInfinite()).toBe(true);
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(1);
  });
});