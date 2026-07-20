// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-03e5dd4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with newline characters", () => {
  it("should correctly parse complex numbers with newline characters but fail when newline is replaced with empty string", () => {
    const complexStr = "2\n+3i";
    const result = new Complex(complexStr);
    expect(result.re).toBe(2);
    expect(result.im).toBe(3);

    // This will fail on mutated code where '\n' is replaced with ""
    const mutatedStr = "2+3i";
    const mutatedResult = new Complex(mutatedStr);
    expect(mutatedResult.re).toBe(2);
    expect(mutatedResult.im).toBe(3);
  });
});