// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f716ea3/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should handle edge case when a = -1 and b = 0 correctly", () => {
    const result = new Complex(-1, 0).atanh();
    // The original code should return (-Infinity, 0) when a = -1 and b = 0
    // The mutated code will return (0, 0) due to the hardcoded false condition
    expect(result.re).toBe(-Infinity);
    expect(result.im).toBe(0);
  });
});