// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2b12188/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acosh mutation test', () => {
  it('should fail when res[""] is accessed instead of res["im"] in acosh', () => {
    const c = new Complex(1.5, 0.5);
    const result = c.acosh();
    // The mutation changes res['im'] to res[""] which will be undefined
    // This will cause the calculation to produce NaN values
    expect(result.isNaN()).toBe(false);
    // Verify specific expected values
    expect(Math.abs(result.re - 1.14328)).toBeLessThan(1e-4);
    expect(Math.abs(result.im - 0.33984)).toBeLessThan(1e-4);
  });
});