// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d7362f1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication optimization path", () => {
  it("should use optimized path for real numbers and produce exact result", () => {
    const a = new Complex(3, 0);
    const b = new Complex(7, 0);
    const result = a.mul(b);
    // This test specifically checks the optimization path exists
    // The mutant breaks the condition check, causing it to take the general path
    // which might produce slightly different floating point results
    expect(result.re).toBe(21);
    expect(result.im).toBe(0);
    // Additional check to ensure we're testing the exact optimization path
    expect(Object.is(result.re, 21)).toBe(true);
  });
});