// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-b9e058f/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.add", () => {
  it("should return Infinity when adding one infinite and one finite complex number", () => {
    const infiniteComplex = new Complex(Infinity, Infinity);
    const finiteComplex = new Complex(1, 1);
    const result = infiniteComplex.add(finiteComplex);
    expect(result.isInfinite()).toBe(true);
  });
});