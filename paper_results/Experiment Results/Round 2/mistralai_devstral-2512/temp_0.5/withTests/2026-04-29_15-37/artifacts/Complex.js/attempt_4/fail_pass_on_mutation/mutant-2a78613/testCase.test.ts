// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2a78613/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication with real numbers", () => {
  it("should optimize multiplication when both numbers are real", () => {
    const a = new Complex(5, 0);
    const b = new Complex(3, 0);
    const result = a.mul(b);
    // This test verifies the optimization path is taken
    // The mutated version would return undefined instead of a Complex number
    expect(result).toBeInstanceOf(Complex);
    expect(result.re).toBe(15);
    expect(result.im).toBe(0);
  });
});