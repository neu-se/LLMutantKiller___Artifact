// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-55b3a3e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc mutation test', () => {
  it('should correctly handle non-zero imaginary component in acsc', () => {
    const c = new Complex(0, 1); // a=0, b=1 (non-zero)
    const result = c.acsc();
    // The original code should compute acsc(0+1i) normally
    // The mutated code will incorrectly trigger the special case (a === 0 && true)
    // This will cause it to return new Complex(Math.PI / 2, Infinity) incorrectly
    expect(result.re).not.toBe(Math.PI / 2);
    expect(result.im).not.toBe(Infinity);
  });
});