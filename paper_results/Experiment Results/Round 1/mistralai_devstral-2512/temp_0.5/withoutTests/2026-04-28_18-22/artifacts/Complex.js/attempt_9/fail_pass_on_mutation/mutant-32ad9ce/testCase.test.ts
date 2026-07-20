// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-32ad9ce/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with NaN handling", () => {
  it("should handle partial NaN differently than full NaN", () => {
    const partialNaN = new Complex(NaN, 5);
    const fullNaN = new Complex(NaN, NaN);
    expect(partialNaN.isNaN()).toBe(true);
    expect(fullNaN.isNaN()).toBe(true);
    expect(partialNaN.re).toBe(NaN);
    expect(partialNaN.im).toBe(5);
  });
});