// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ffc00d7/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing', () => {
  it('should correctly handle complex numbers with operator followed by imaginary unit and number', () => {
    const c1 = new Complex('+i5');
    expect(c1.re).toBe(0);
    expect(c1.im).toBe(5);

    const c2 = new Complex('-i3');
    expect(c2.re).toBe(0);
    expect(c2.im).toBe(-3);
  });
});