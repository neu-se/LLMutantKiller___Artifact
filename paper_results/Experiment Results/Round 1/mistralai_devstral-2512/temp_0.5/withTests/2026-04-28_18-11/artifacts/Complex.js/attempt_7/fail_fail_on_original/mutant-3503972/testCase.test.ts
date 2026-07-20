// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3503972/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should return negative infinity for imaginary part when input is (0 + 0i)", () => {
    const c = new Complex(0, 0);
    const result = c.acsch();
    expect(result.im).toBe(-Infinity);
  });
});