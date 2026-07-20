import Complex from '../complex.js';

describe('Complex', () => {
  it('should calculate cosm1 correctly for small x', () => {
    const x = 0.00001;
    const complex = new Complex(x);
    const result = complex.expm1();
    const expected = Math.expm1(x);
    expect(Math.abs(result.re - expected) < 1e-9).toBe(true);
    expect(Math.abs(result.im) < 1e-9).toBe(true);
  });
});