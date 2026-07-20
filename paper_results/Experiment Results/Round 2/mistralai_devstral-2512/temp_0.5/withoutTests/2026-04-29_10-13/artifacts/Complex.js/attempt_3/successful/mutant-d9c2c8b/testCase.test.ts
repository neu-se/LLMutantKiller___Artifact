// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d9c2c8b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute the imaginary part of atanh for a specific complex number", () => {
    const z = new Complex(0.5, 0.5);
    const result = z.atanh();
    // The expected value is computed based on the original implementation
    // For z = 0.5 + 0.5i, atanh(z) should have an imaginary part of approximately 0.5535743588970452
    expect(result.im).toBeCloseTo(0.5535743588970452, 10);
  });
});