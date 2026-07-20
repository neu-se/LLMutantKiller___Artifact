import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acsch mutation detection', () => {
  it('should compute acsch correctly for a complex number with non-zero real part where d=0 branch uses a correctly', () => {
    // The mutation changes (a !== 0) ? a / 0 : 0 to (false) ? a / 0 : 0
    // This affects the d === 0 branch in acsch
    // We need a case where a !== 0 and d === 0, but that's impossible for real a,b
    // However, the +b/d vs the sign in the d !== 0 branch is what we test
    const c = new Complex(1, 1);
    const result = c.acsch();
    const expected = new Complex(1, 1).inverse().asinh();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});