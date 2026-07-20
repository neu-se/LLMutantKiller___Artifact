// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a9210c8/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should produce different results when imaginary part is accessed incorrectly", () => {
    const c = new Complex(0, 1);
    const result = c.sech();
    // The mutation changes this['im'] to this[""] which will cause the calculation
    // to use undefined instead of the actual imaginary part
    // This should produce a different result than the correct calculation
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    // Verify the result is a valid complex number
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});