// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ffc00d7/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing', () => {
  it('should correctly parse complex numbers with leading operators', () => {
    const c1 = new Complex('+3+4i');
    expect(c1.re).toBe(3);
    expect(c1.im).toBe(4);

    const c2 = new Complex('-5-6i');
    expect(c2.re).toBe(-5);
    expect(c2.im).toBe(-6);

    const c3 = new Complex('+7-8i');
    expect(c3.re).toBe(7);
    expect(c3.im).toBe(-8);

    const c4 = new Complex('-9+10i');
    expect(c4.re).toBe(-9);
    expect(c4.im).toBe(10);
  });
});