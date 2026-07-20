// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a7a4d0d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly transform coordinates when imaginary part is positive", () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    // The mutation changes the condition from `res['im'] <= 0` to `if (true)`
    // This should cause the coordinate transformation to always happen
    // Original code should only transform when im <= 0
    // So for positive im, original should NOT transform, but mutated will
    expect(result.re).toBeCloseTo(0.881374, 5);
    expect(result.im).toBeCloseTo(0.658479, 5);
  });
});