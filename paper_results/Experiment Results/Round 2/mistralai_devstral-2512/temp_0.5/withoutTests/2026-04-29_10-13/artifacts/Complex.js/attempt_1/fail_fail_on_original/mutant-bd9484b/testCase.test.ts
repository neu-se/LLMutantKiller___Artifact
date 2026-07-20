// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-bd9484b/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.acosh()", () => {
  it("should correctly handle the case when the imaginary part of the result is exactly zero", () => {
    const c = new Complex(1, 0);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});