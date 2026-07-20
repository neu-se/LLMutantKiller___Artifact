// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-32ad9ce/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with NaN handling", () => {
  it("should return finite number when only imaginary part is NaN but real is finite", () => {
    const result = new Complex(5, NaN);
    expect(result.isNaN()).toBe(false);
    expect(result.re).toBe(5);
    expect(result.im).toBe(0);
  });
});