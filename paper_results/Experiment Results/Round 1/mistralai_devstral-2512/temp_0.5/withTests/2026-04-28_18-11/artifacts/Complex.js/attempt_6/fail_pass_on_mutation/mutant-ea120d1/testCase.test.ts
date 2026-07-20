// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ea120d1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot mutation test", () => {
  it("should expose difference in logHypot boundary condition", () => {
    // Create a complex number where both components are exactly 3000
    // This tests the exact boundary that was mutated
    const c = new Complex(3000, 3000);
    const result = c.log();

    // Calculate what the result should be using direct computation
    const expectedRe = Math.log(Math.sqrt(3000*3000 + 3000*3000));
    const expectedIm = Math.atan2(3000, 3000);

    // The mutation changes the condition from < to <= which affects
    // whether the overflow-safe path is taken when b=3000
    // The overflow-safe path will produce a slightly different result
    // due to different computation order and floating point precision
    expect(result.re).toBeCloseTo(expectedRe, 15);
    expect(result.im).toBeCloseTo(expectedIm, 15);
  });
});