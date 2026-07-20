import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should correctly calculate asec for complex numbers', () => {
    const complex = new Complex(2, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});