// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5b5dc13/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should handle the case where a is 0 and b is 0 by returning Infinity", () => {
    const result = new Complex(0, 0).acsch();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});