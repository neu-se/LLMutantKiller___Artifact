// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-bd9484b/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.acosh()", () => {
  it("should handle edge case where imaginary part is exactly zero", () => {
    const c = new Complex(1, 0);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});