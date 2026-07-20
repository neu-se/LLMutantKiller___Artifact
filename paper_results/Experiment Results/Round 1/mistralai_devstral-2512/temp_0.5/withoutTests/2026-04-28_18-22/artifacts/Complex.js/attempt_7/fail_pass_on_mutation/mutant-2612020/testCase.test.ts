// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2612020/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing', () => {
  it('should correctly parse complex number from string with negative imaginary part without coefficient', () => {
    const c = new Complex('-i');
    expect(c.re).toBe(0);
    expect(c.im).toBe(-1);
  });
});