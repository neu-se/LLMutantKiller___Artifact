import { Complex } from '../complex';

describe('Complex', () => {
  it('should calculate the complex exponent correctly', () => {
    const complex = new Complex(0, Math.PI / 2);
    const result = complex.exp();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(1, 10);
  });
});