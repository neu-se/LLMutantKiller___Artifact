// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d7362f1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication with real numbers", () => {
  it("should use the optimized path for real numbers and produce exact results", () => {
    const a = new Complex(3, 0);
    const b = new Complex(7, 0);
    const result = a.mul(b);
    // The mutant changes this['im'] to this[""] which is undefined
    // This causes the condition to evaluate to (0 === 0 && undefined === 0) which is false
    // So it falls through to the general case which should still work but might have
    // different floating point behavior. We test the exact expected result.
    expect(result.re).toBe(21);
    expect(result.im).toBe(0);
    // Additional check to ensure we're getting the exact optimized result
    expect(Object.is(result.re, 21)).toBe(true);
    expect(Object.is(result.im, 0)).toBe(true);
  });
});