// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-541c4eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly handle state manipulation during asinh calculation for complex numbers", () => {
    const c = new Complex(0.5, 0.5);
    const originalRe = c.re;
    const originalIm = c.im;
    const result = c.asinh();
    // The mutation changes internal state manipulation
    // Verify the result is correct and state wasn't corrupted
    expect(result.re).toBeCloseTo(0.4228350337665848, 10);
    expect(result.im).toBeCloseTo(0.5739751991292237, 10);
    // Verify original object state is preserved
    expect(c.re).toBe(originalRe);
    expect(c.im).toBe(originalIm);
  });
});