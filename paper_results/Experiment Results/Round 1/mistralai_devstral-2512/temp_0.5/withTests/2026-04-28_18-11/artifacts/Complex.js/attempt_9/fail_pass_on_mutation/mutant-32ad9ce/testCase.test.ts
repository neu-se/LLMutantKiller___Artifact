// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-32ad9ce/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with NaN handling", () => {
  it("should correctly identify NaN when only imaginary part is NaN", () => {
    const result = new Complex(5, NaN);
    expect(result.isNaN()).toBe(true);
  });
});