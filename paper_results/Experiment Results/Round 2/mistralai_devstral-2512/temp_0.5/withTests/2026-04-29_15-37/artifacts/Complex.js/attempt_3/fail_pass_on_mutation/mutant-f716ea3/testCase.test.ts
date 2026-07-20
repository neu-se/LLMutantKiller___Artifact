// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f716ea3/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should return correct value for atanh(-1, 0)", () => {
    const result = new Complex(-1, 0).atanh();
    // The original code should return a specific finite value when a = -1 and b = 0
    // The mutated code will return a different value due to the hardcoded false condition
    expect(result.re).toBeCloseTo(-Infinity);
    expect(result.im).toBeCloseTo(0);
  });
});