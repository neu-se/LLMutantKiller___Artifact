// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d85712e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing', () => {
  it('should correctly parse complex numbers with imaginary parts', () => {
    const c = new Complex('1+2i');
    expect(c.re).toBe(1);
    expect(c.im).toBe(2);
  });
});