// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-6835819/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a complex number with non-zero imaginary part", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    // The mutation changes (onePlus * oneMinus - b * b) to (onePlus * oneMinus - b / b)
    // For b = 0.5, b*b = 0.25 while b/b = 1, which will produce different results
    // We test both real and imaginary parts to ensure the mutation is caught
    expect(result.re).toBeCloseTo(0.40235947810852507, 10);
    expect(result.im).toBeCloseTo(0.5535743588970452, 10);
  });
});