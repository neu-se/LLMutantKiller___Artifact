// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5b5dc13/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should handle the edge case where a is non-zero and b is 0", () => {
    const result = new Complex(0.5, 0).acsch();
    const expectedRe = Math.log(0.5 + Math.sqrt(0.25 + 1));
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBe(0);
  });
});