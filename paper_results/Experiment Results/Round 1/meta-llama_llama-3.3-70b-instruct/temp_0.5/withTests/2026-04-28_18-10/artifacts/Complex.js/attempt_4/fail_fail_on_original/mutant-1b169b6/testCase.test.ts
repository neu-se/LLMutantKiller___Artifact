import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly calculate the complex acoth', () => {
    const complex = new Complex(2, 1);
    const result = complex.acoth();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
  });
});