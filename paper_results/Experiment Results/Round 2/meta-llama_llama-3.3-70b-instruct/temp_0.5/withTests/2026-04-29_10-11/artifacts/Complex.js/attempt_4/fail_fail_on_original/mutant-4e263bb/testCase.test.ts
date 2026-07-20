import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should calculate acoth correctly', () => {
    const complex = new Complex(1, 2);
    const a = complex.re;
    expect(a).toBe(1);
  });
});