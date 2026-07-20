// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-dd8276f/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acsc()", () => {
  it("should handle non-zero real and zero imaginary parts correctly", () => {
    const c = new Complex(2, 0);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(0.5235987755982989, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});