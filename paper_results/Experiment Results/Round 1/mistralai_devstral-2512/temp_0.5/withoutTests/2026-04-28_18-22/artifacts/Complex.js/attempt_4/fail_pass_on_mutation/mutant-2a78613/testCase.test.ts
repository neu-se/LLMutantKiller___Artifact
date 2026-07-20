// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2a78613/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication edge case", () => {
  it("should handle multiplication of real numbers correctly", () => {
    const a = new Complex(1.5, 0);
    const b = new Complex(2, 0);
    const result = a.mul(b);
    expect(result.re).toBeCloseTo(3);
    expect(result.im).toBeCloseTo(0);
  });
});