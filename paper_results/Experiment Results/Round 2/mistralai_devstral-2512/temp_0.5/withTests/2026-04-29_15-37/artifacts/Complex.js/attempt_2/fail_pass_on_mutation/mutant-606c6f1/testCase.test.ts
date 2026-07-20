// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-606c6f1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.add", () => {
  it("should return Complex.INFINITY when adding a finite number to Infinity", () => {
    const finite = new Complex(5, 3);
    const infinite = Complex.INFINITY;
    const result = infinite.add(finite);
    expect(result).toEqual(Complex.INFINITY);
  });
});