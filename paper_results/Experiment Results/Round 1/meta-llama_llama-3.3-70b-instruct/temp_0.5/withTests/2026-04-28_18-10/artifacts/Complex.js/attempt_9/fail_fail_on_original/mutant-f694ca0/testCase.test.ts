import { Complex } from '../../complex';

describe('Complex.js', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    const x = 0.01;
    const complex = new Complex(x);
    const result = complex.cosm1(x);
    const expected = Math.cos(x) - 1;
    expect(Math.abs(result - expected) < 1e-5).toBe(true);
  });
});