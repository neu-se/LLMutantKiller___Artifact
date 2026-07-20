import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly calculate asec for complex numbers', () => {
    const complex = new Complex(0, 1);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-Math.PI / 2);
  });
});