// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-32ad9ce/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing with NaN handling", () => {
  it("should return NaN when imaginary part is NaN and real part is valid", () => {
    const result = new Complex(5, NaN);
    expect(result.isNaN()).toBe(true);
    expect(result.re).toBe(5);
    expect(result.im).toBeNaN();
  });
});