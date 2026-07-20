// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ffc00d7/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing', () => {
  it('should correctly parse complex numbers with operator followed by imaginary unit', () => {
    const c = new Complex('+i');
    expect(c.re).toBe(0);
    expect(c.im).toBe(1);
  });
});