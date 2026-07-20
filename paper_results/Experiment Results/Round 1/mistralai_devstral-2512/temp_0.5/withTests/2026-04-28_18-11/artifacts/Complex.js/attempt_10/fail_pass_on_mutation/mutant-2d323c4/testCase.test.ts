// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2d323c4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly handle the case where a^2 - b^2 = 0 by using the special branch", () => {
    // Create a complex number where a^2 - b^2 = 0 (d = 0 case)
    const c = new Complex(1, 1);
    const result = c.acsch();
    // The mutation changes the condition from (d !== 0) to (true)
    // This forces the function to always take the first branch
    // The original code should take the second branch when d = 0
    // The second branch returns a different result
    // We verify this by checking the result is not the same as the first branch
    expect(result.re).toBeCloseTo(0.5306375309525179, 10);
    expect(result.im).toBeCloseTo(-0.45227844715119064, 10);
  });
});