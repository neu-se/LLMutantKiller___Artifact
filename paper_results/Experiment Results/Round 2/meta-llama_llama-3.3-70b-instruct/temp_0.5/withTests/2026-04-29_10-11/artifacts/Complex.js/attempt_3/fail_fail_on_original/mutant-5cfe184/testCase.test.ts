import { Complex } from './complex';

describe('Complex', () => {
  it('should return the correct result for atanh with a = 1.5 and b = 0', () => {
    const complex = new Complex(1.5, 0);
    const result = complex.atanh();
    expect(result.im).toBeCloseTo(0, 10);
  });

  it('should return the correct result for atanh with a = 0.5 and b = 0', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.atanh();
    expect(result.im).toBeCloseTo(0, 10);
  });
});