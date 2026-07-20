import { Complex } from '../complex';

describe('Complex.js', () => {
  it('should correctly calculate the atanh of a complex number', () => {
    const complex = new Complex(1.1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.9501821192364763, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});