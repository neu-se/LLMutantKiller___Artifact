// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2b12188/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acosh mutation test', () => {
  it('should fail when accessing undefined property in acosh', () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    // The mutation changes res['im'] to res[""] which will be undefined
    // This will cause the calculation to fail and produce NaN values
    expect(result.isNaN()).toBe(false);
    // Verify specific expected values that will fail with the mutation
    expect(Math.abs(result.re - 1.0612750619050357)).toBeLessThan(1e-10);
    expect(Math.abs(result.im - 0.9045568943023814)).toBeLessThan(1e-10);
  });
});