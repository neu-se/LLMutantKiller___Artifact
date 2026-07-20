// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ea120d1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot mutation test", () => {
  it("should correctly handle boundary case where both components equal 3000", () => {
    // This test targets the exact boundary condition that was mutated
    // Original: if (_a < 3000 && _b < 3000)
    // Mutated:  if (_a < 3000 && _b <= 3000)
    const c = new Complex(3000, 3000);
    const result = c.log();

    // With the mutation, this case would incorrectly use the overflow-safe path
    // when it should use the direct computation path
    const expectedRe = Math.log(Math.sqrt(3000 * 3000 + 3000 * 3000));
    const expectedIm = Math.atan2(3000, 3000);

    // The test should fail on mutated code because the different computation paths
    // will produce slightly different results due to floating point precision
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});