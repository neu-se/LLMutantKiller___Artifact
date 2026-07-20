// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a7a4d0d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should produce correct sign transformation for acosh result", () => {
    const c = new Complex(1.5, 1);
    const result = c.acosh();
    // The mutation changes the condition from `res['im'] <= 0` to `if (true)`
    // This affects the coordinate transformation logic in acosh
    // Original code should swap and negate coordinates when im <= 0
    // Mutated code will always perform the transformation
    expect(result.re).toBeCloseTo(0.962424, 5);
    expect(result.im).toBeCloseTo(-0.607136, 5);
  });
});