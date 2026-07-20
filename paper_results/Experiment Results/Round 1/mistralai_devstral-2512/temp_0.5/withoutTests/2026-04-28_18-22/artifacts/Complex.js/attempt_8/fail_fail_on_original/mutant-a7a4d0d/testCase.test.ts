// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a7a4d0d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly handle the coordinate transformation based on imaginary part sign", () => {
    const c = new Complex(0, 2); // Pure imaginary input
    const result = c.acosh();
    // The mutation changes the condition from checking res['im'] <= 0 to always true
    // This affects the coordinate transformation in the acosh implementation
    // For this input, the original code should produce specific results
    expect(result.re).toBeCloseTo(1.31696, 4);
    expect(result.im).toBeCloseTo(1.5708, 4);
  });
});