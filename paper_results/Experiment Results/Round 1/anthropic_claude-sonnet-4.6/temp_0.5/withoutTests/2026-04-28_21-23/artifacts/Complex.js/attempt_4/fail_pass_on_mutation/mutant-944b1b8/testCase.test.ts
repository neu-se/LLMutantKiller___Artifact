import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('detects mutation by checking asec of purely imaginary number gives specific real part', () => {
    // For asec(2i): a=0, b=2, d=4
    // Original path: new Complex(0, -0.5).acos()
    // Mutated path:  new Complex(NaN, -0.5).acos()
    // These should produce different results
    const orig_inner = new Complex(0, -0.5).acos();
    const result = new Complex(0, 2).asec();
    expect(result.re).toBeCloseTo(orig_inner.re, 10);
    expect(result.im).toBeCloseTo(orig_inner.im, 10);
  });
});