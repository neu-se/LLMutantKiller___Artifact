import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 2);
    const acot = complex.acot();
    expect(typeof acot).toBe('object');
    expect(acot.re).toBeLessThan(0);
    expect(acot.im).toBeLessThan(0);
  });
});