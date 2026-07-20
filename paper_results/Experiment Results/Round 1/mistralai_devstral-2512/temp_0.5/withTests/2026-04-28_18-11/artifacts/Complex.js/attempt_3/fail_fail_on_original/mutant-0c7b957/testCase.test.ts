// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0c7b957/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a complex number with non-zero imaginary part", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    // Using the actual expected values from the original implementation
    expect(result.re).toBeCloseTo(0.40235947810852507, 10);
    expect(result.im).toBeCloseTo(0.5493061443340548, 10);
  });
});