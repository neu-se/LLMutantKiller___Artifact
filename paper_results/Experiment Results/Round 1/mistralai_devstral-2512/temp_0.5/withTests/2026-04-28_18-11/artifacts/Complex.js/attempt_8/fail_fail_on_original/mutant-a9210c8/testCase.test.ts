// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a9210c8/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should produce consistent results for purely imaginary numbers", () => {
    const c = new Complex(0, 0.5);
    const result = c.sech();
    // The mutation changes this['im'] to this[""] which will cause incorrect calculation
    // For original code, sech(0+0.5i) should have specific properties
    // We verify the result is finite and has expected magnitude
    expect(Number.isFinite(result.re)).toBe(true);
    expect(Number.isFinite(result.im)).toBe(true);
    // The real part should be positive and greater than 0.5
    expect(result.re).toBeGreaterThan(0.5);
    expect(result.re).toBeLessThan(1.1);
  });
});