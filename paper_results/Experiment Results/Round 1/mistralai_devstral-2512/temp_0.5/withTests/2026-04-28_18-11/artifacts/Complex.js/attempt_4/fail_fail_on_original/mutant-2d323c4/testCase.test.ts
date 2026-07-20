// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2d323c4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsch()", () => {
  it("should correctly handle the case where a^2 - b^2 = 0", () => {
    // Create a complex number where a^2 - b^2 = 0 (d = 0 case)
    const c = new Complex(Math.sqrt(2), Math.sqrt(2));
    const result = c.acsch();
    // The mutation changes the condition from (d !== 0) to (true)
    // This should cause the function to take a different code path
    // When d = 0, the original returns a different branch than the mutated version
    expect(result.re).toBeCloseTo(0.881373587019543);
    expect(result.im).toBeCloseTo(-0.881373587019543);
  });
});