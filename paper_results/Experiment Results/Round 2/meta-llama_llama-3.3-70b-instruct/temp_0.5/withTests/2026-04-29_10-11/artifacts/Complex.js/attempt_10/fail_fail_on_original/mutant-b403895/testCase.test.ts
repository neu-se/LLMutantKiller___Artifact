import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly calculate asec for complex numbers', () => {
    const complex = new Complex(1, 1);
    const result = complex.asec();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
  });
});