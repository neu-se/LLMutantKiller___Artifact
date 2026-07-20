import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should correctly multiply two real complex numbers and return a new Complex object', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(result.re).toBeCloseTo(6);
    expect(result.im).toBeCloseTo(0);
    expect(result.constructor.name).toBe('Complex');
  });
});