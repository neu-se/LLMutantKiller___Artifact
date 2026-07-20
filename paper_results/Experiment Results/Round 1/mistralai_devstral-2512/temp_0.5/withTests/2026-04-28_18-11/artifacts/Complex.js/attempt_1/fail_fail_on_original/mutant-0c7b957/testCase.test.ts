// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0c7b957/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a complex number with non-zero imaginary part", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    // The mutation changes the denominator calculation in atanh, which affects the result
    // For the original code, we expect a specific result that differs from the mutated version
    expect(result.re).toBeCloseTo(0.216, 3);
    expect(result.im).toBeCloseTo(0.549, 3);
  });
});