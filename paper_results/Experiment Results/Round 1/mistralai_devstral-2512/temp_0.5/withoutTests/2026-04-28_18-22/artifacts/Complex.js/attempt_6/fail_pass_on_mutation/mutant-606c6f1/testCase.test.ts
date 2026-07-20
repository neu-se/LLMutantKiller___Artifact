// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-606c6f1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.add", () => {
  it("should return Infinity when adding Infinity to a finite complex number", () => {
    const finite = new Complex(1, 2);
    const infinite = Complex.INFINITY;
    const result = infinite.add(finite);
    expect(result).toEqual(Complex.INFINITY);
  });
});