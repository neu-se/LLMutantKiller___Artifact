// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-32ad9ce/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with NaN handling", () => {
  it("should return NaN when either real or imaginary part is NaN", () => {
    const result1 = new Complex(NaN, 5);
    const result2 = new Complex(5, NaN);
    expect(result1.isNaN()).toBe(true);
    expect(result2.isNaN()).toBe(true);
  });
});