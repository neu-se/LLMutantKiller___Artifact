import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex exp', () => {
  it('exp of complex number with im=0 should equal Math.exp of real part', () => {
    const c = new Complex(0, 0);
    const result = c.exp();
    expect(result.re).toBe(1);
    expect(result.im).toBe(Math.sin(0));
    expect(Object.is(result.im, 0)).toBe(true);
    expect(Object.is(result.im, -0)).toBe(false);
  });
});