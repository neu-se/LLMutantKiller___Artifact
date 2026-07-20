// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2a78613/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication with real numbers", () => {
  it("should return undefined when multiplying two real numbers in mutated code", () => {
    const a = new Complex(3, 0);
    const b = new Complex(4, 0);
    const result = a.mul(b);
    expect(result).toBeDefined();
    expect(result.re).toBe(12);
    expect(result.im).toBe(0);
  });
});