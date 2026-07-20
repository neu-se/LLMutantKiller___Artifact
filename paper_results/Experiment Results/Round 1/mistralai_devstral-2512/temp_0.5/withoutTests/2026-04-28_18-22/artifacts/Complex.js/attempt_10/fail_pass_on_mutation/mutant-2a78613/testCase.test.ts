// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2a78613/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication optimization path", () => {
  it("should correctly handle multiplication of real numbers", () => {
    const a = new Complex(1.5, 0);
    const b = new Complex(2, 0);
    const result = a.mul(b);
    // The mutation removes the return statement in the optimization path
    // which would cause the function to fall through to the general case
    // and potentially produce different results due to floating point precision
    expect(result.re).toBe(3);
    expect(result.im).toBe(0);
    // Additional check to ensure we're testing the exact optimization path
    expect(Object.is(result.re, 3)).toBe(true);
    expect(Object.is(result.im, 0)).toBe(true);
  });
});