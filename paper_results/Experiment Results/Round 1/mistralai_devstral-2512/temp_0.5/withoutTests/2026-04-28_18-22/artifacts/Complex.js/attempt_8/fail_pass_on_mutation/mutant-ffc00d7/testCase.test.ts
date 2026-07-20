// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ffc00d7/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing', () => {
  it('should correctly parse complex numbers with operator followed by imaginary unit and handle sign changes', () => {
    const c1 = new Complex('+i');
    expect(c1.re).toBe(0);
    expect(c1.im).toBe(1);

    const c2 = new Complex('-i');
    expect(c2.re).toBe(0);
    expect(c2.im).toBe(-1);

    const c3 = new Complex('++i');
    expect(c3.re).toBe(0);
    expect(c3.im).toBe(1);

    const c4 = new Complex('--i');
    expect(c4.re).toBe(0);
    expect(c4.im).toBe(1);

    const c5 = new Complex('+-i');
    expect(c5.re).toBe(0);
    expect(c5.im).toBe(-1);
  });
});