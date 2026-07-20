// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2d323c4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should return correct values for complex numbers where a^2 - b^2 = 0", () => {
    // Create a complex number where a^2 - b^2 = 0 (d = 0 case)
    const c = new Complex(1, 1);
    const result = c.acsch();
    // The mutation changes the condition from (d !== 0) to (true)
    // This should cause the function to always take the first branch
    // When d = 0, the original code takes the second branch
    expect(result.re).toBeCloseTo(0.5306375309525179);
    expect(result.im).toBeCloseTo(-0.9045568943023814);
  });
});