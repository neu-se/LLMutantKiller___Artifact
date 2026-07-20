// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-b403895/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return Infinity for real part when input has zero magnitude", () => {
    const c = new Complex(0, 1);
    const result = c.asec();
    expect(result.re).toBe(Infinity);
  });
});