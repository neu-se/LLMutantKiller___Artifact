// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-6835819/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a complex number with non-zero imaginary part", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    // The mutation changes the calculation from (onePlus * oneMinus - b * b) to (onePlus * oneMinus - b / b)
    // For b = 0.5, b / b = 1, while b * b = 0.25, which will produce different results
    // We expect the real part to be approximately 0.5493061443340548 (computed from correct formula)
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    // The imaginary part should be approximately 0.5235987755982989
    expect(result.im).toBeCloseTo(0.5235987755982989, 10);
  });
});