// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-944b1b8/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return correct result for asec(0)", () => {
    const result = new Complex(0, 0).asec();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});