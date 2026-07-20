// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ea120d1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot mutation test", () => {
  it("should correctly handle edge case where b equals 3000 in logHypot", () => {
    // Create a complex number where the imaginary part is exactly 3000
    // This tests the boundary condition that was mutated
    const c = new Complex(1, 3000);
    const result = c.log();

    // The real part should be log(sqrt(1^2 + 3000^2))
    // With the mutation (<= instead of <), this would incorrectly use the overflow-safe path
    // when it should use the direct computation path
    const expectedRe = Math.log(Math.sqrt(1 + 3000 * 3000));

    // The test should fail on mutated code because the overflow-safe path
    // would produce a different result for this exact boundary case
    expect(result.re).toBeCloseTo(expectedRe, 10);
  });
});