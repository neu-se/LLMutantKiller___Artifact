// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2a78613/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication with real numbers", () => {
  it("should return undefined when multiplying two real numbers (mutation detection)", () => {
    const a = new Complex(3, 0);
    const b = new Complex(4, 0);
    const result = a.mul(b);
    // This test is designed to fail on the mutated version which has an empty if block
    // that would return undefined instead of a Complex number
    expect(result).toBeUndefined();
  });
});