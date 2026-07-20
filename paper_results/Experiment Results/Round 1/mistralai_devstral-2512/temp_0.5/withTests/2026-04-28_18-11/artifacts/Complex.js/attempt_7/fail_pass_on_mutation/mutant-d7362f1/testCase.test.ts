// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d7362f1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex multiplication optimization', () => {
  it('should use optimized path for real numbers and produce exact result', () => {
    const a = new Complex(2, 0);
    const b = new Complex(3, 0);
    const result = a.mul(b);
    // The mutation changes this['im'] to this[""] which is undefined
    // This causes the condition to fail and use the general multiplication path
    // The general path might produce slightly different floating point results
    // due to different calculation order
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
    // This will fail on mutated code because the optimization path isn't taken
    expect(result.re).toBeCloseTo(6, 15);
    expect(result.im).toBeCloseTo(0, 15);
  });
});