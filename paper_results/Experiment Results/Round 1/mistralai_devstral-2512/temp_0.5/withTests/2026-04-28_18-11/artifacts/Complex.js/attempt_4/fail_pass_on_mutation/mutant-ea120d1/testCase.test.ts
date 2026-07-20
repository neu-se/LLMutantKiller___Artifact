// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ea120d1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot mutation test", () => {
  it("should correctly compute log for complex numbers with large imaginary component", () => {
    // Test case specifically targeting the boundary condition in logHypot
    // where b equals exactly 3000
    const c = new Complex(1, 3000);
    const result = c.log();

    // Calculate expected result using direct computation
    const expectedRe = Math.log(Math.sqrt(1 + 3000 * 3000));
    const expectedIm = Math.atan2(3000, 1);

    // The mutation changes the condition from < to <= which affects
    // whether the overflow-safe path is taken for b=3000
    expect(result.re).toBeCloseTo(expectedRe, 12);
    expect(result.im).toBeCloseTo(expectedIm, 12);
  });
});