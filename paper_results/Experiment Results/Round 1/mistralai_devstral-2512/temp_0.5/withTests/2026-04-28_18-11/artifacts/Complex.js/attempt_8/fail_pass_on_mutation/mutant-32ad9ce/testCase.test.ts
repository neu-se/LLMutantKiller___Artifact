// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-32ad9ce/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with NaN handling", () => {
  it("should handle NaN in real part while keeping valid imaginary part", () => {
    const result = new Complex(NaN, 5);
    expect(result.re).toBeNaN();
    expect(result.im).toBe(5);
    expect(result.isNaN()).toBe(true);
  });
});