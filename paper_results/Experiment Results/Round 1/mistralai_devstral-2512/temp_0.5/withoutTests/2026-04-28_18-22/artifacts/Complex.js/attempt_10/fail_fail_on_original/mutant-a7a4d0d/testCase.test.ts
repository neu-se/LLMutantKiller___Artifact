// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a7a4d0d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should produce different results for positive vs negative imaginary parts", () => {
    const c1 = new Complex(1, 1);  // positive imaginary
    const c2 = new Complex(1, -1); // negative imaginary
    const result1 = c1.acosh();
    const result2 = c2.acosh();
    // The mutation changes the condition from `res['im'] <= 0` to `if (true)`
    // This should make the results identical when they should be different
    expect(result1.re).not.toBeCloseTo(result2.re, 10);
    expect(result1.im).not.toBeCloseTo(result2.im, 10);
  });
});