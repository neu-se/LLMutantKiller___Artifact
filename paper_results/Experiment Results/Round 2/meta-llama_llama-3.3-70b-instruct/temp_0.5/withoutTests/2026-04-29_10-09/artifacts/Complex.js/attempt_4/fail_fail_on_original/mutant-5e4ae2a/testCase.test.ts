import { Complex } from './complex';

describe('Complex', () => {
  it('should handle atanh correctly for real numbers greater than 1', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    expect(result.im).not.toBeCloseTo(-result.im);
  });
});