// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ea120d1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot mutation test", () => {
  it("should correctly compute log for complex numbers with b=3000", () => {
    // Test the exact boundary case that was mutated
    const c = new Complex(1, 3000);
    const result = c.log();

    // The mutation changes the condition from _b < 3000 to _b <= 3000
    // This affects whether the overflow-safe path is taken
    // We need to test a value where the two computation paths would produce different results
    // Using a very small real component (1) and large imaginary (3000) to amplify the difference

    // Calculate expected result using the direct computation path
    const expectedRe = Math.log(Math.sqrt(1*1 + 3000*3000));
    const expectedIm = Math.atan2(3000, 1);

    // The test should fail on mutated code because the overflow-safe path
    // will produce a different result for this boundary case
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});