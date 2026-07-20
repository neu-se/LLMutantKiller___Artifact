// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-248a99f/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division edge case", () => {
  it("should return ZERO when dividing zero by infinity", () => {
    const zero = new Complex(0, 0);
    const infinity = new Complex(Infinity, Infinity);
    const result = zero.div(infinity);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});