// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a7a4d0d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should correctly transform coordinates when imaginary part is positive", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.acosh();
    // The mutation changes the condition from checking res['im'] <= 0 to always true
    // This should cause incorrect coordinate transformation for positive imaginary parts
    expect(result.re).toBeCloseTo(0.693147, 5);
    expect(result.im).toBeCloseTo(0.523599, 5);
  });
});