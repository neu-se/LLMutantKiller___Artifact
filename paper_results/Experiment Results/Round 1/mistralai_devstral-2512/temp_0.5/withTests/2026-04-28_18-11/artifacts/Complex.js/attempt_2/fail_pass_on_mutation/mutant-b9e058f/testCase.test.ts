// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-b9e058f/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.add", () => {
  it("should return NaN when adding two infinite complex numbers", () => {
    const infiniteComplex = new Complex(Infinity, Infinity);
    const result = infiniteComplex.add(Infinity, Infinity);
    expect(result.isNaN()).toBe(true);
  });
});