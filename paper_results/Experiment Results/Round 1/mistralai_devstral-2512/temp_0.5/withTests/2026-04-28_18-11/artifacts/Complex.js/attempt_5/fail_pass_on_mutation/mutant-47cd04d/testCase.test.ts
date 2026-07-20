// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-47cd04d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.add", () => {
  it("should return NaN when adding two infinite complex numbers", () => {
    const infinity1 = new Complex(Infinity, Infinity);
    const infinity2 = new Complex(Infinity, Infinity);
    const result = infinity1.add(infinity2);
    expect(result.isNaN()).toBe(true);
  });
});