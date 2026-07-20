// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f716ea3/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly handle the case when a = -1 and b = 0", () => {
    const result = new Complex(-1, 0).atanh();
    expect(result.re).toBe(-Infinity);
    expect(result.im).toBe(0);
  });
});