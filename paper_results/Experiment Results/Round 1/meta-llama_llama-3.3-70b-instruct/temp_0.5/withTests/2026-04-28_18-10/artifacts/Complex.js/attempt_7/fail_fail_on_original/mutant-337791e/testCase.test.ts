import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate the complex exponent correctly', () => {
    const complex = new Complex(0, Math.PI / 2);
    const result = complex.exp();
    expect(result.re).toBeCloseTo(Math.cos(Math.PI / 2), 10);
    expect(result.im).toBeCloseTo(Math.sin(Math.PI / 2), 10);
  });
});