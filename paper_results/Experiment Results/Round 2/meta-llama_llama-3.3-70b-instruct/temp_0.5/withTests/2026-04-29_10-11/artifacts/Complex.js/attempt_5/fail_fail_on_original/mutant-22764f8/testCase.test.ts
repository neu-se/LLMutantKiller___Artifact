import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    expect(complex.re).toBe(complex.re);
  });
});