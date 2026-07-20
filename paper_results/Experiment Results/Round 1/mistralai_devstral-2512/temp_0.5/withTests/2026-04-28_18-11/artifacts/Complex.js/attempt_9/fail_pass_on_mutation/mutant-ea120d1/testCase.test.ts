// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ea120d1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot mutation test", () => {
  it("should correctly handle the boundary case where b equals exactly 3000", () => {
    // This test targets the specific mutation in logHypot
    // Original: if (_a < 3000 && _b < 3000)
    // Mutated:  if (_a < 3000 && _b <= 3000)
    // We need to test with b=3000 and a small enough to trigger the condition

    const c = new Complex(1, 3000);
    const result = c.log();

    // The direct computation path result
    const expectedRe = Math.log(Math.sqrt(1 + 3000 * 3000));
    const expectedIm = Math.atan2(3000, 1);

    // The mutation will cause the overflow-safe path to be taken
    // which uses: Math.log(a) + Math.log(1 + t * t) / 2
    // This should produce a different result than the direct path
    // We use exact equality check to ensure the test fails on mutation
    expect(result.re).toBe(expectedRe);
    expect(result.im).toBe(expectedIm);
  });
});