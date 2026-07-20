import { Complex } from '../../complex';

describe('Complex', () => {
  it('should return the correct result for atanh with a = 2 and b = 0', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });

  it('should return the correct result for atanh with a = 0.5 and b = 0', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.atanh();
    expect(result.im).toBeCloseTo(0, 10);
  });
});