// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-541c4eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly handle the internal state manipulation during asinh calculation", () => {
    const c = new Complex(2, 3);
    const originalRe = c.re;
    const originalIm = c.im;
    const result = c.asinh();
    // Verify the result is correct
    expect(result.re).toBeCloseTo(1.968637925793096, 10);
    expect(result.im).toBeCloseTo(0.9646585044076028, 10);
    // Verify the original object's state is preserved
    expect(c.re).toBe(originalRe);
    expect(c.im).toBe(originalIm);
  });
});