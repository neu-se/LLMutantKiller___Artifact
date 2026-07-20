// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f716ea3/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.atanh", () => {
  it("should correctly handle the case when a = -1 and b = 0", () => {
    const result = new Complex(-1, 0).atanh();
    // The original code should return a finite value when a = -1 and b = 0
    // The mutated code will incorrectly return Infinity due to the hardcoded false condition
    expect(result.re).not.toBe(Infinity);
    expect(result.im).not.toBe(Infinity);
  });
});