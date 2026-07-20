// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a6245b5/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should handle non-zero imaginary component when real part is -1", () => {
    const result = new Complex(-1, 1).atanh();
    expect(result.re).toBeCloseTo(-0.2554128115, 6);
    expect(result.im).toBeCloseTo(1.0172219679, 6);
  });
});