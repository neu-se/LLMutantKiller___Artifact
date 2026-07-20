import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly access imaginary part in acsch method', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});