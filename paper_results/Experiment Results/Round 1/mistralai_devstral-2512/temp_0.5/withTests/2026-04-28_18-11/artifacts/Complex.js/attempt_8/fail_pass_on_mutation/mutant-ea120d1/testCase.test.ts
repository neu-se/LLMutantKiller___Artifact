// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ea120d1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot mutation test", () => {
  it("should expose difference in boundary condition handling", () => {
    // Test case specifically designed to expose the mutation
    // Original: if (_a < 3000 && _b < 3000)
    // Mutated:  if (_a < 3000 && _b <= 3000)
    // We need a case where b=3000 and the two computation paths produce different results

    // Create a complex number where b=3000 and a is small enough to trigger the condition
    const c = new Complex(1, 3000);
    const result = c.log();

    // Calculate what the result should be using direct computation
    const expectedRe = Math.log(Math.sqrt(1*1 + 3000*3000));
    const expectedIm = Math.atan2(3000, 1);

    // The mutation will cause the overflow-safe path to be taken
    // which uses a different computation method that should produce a detectably different result
    // We use a tighter precision to ensure the test fails on the mutated version
    expect(result.re).toBeCloseTo(expectedRe, 14);
    expect(result.im).toBeCloseTo(expectedIm, 14);
  });
});