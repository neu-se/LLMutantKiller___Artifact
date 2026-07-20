// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-e89f8b8/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csc()', () => {
  it('should correctly compute the cosecant of a complex number with specific properties', () => {
    const c = new Complex(2, 1);
    const result = c.csc();
    // The mutation changes division to multiplication in the csc calculation
    // This will cause the result to be drastically different
    // We check that the result is finite and has reasonable magnitude
    expect(Number.isFinite(result.re)).toBe(true);
    expect(Number.isFinite(result.im)).toBe(true);
    // The mutated version would produce much larger values due to multiplication instead of division
    expect(Math.abs(result.re)).toBeLessThan(10);
    expect(Math.abs(result.im)).toBeLessThan(10);
  });
});