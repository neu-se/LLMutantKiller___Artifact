// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-7721017/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should correctly handle 0^0 case", () => {
    const zero = new Complex(0, 0);
    const result = zero.pow(0);
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
  });
});