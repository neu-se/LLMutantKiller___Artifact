import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex sin with small imaginary part', () => {
  it('sin(pi/2 + i*epsilon) real part reflects cosh fallback returning 1-x', () => {
    const orig = (Math as any).cosh;
    (Math as any).cosh = undefined;
    jest.resetModules();
    const Cx = require('../../../../../../../../../../../subject_repositories/Complex.js/complex.js');
    (Math as any).cosh = orig;
    const x = 5e-10;
    const c = new Cx(Math.PI / 2, x);
    const result = c.sin();
    // original: re = 1 * (1 - x) = 1 - 5e-10 < 1
    // mutated:  re = 1 * cosh(x) ≈ 1 + x²/2 > 1... wait no, (exp(x)+exp(-x))/2 > 1 for x>0
    expect(result.re).toBeLessThan(1.0);
  });
});