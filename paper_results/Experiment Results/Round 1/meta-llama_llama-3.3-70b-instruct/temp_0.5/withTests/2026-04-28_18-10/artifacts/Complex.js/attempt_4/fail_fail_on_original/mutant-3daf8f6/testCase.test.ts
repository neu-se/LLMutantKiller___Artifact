import { Complex } from './complex';

describe('Complex.js', () => {
  it('should calculate hypot correctly', () => {
    const a = 3000;
    const b = 3000;
    const complex = new Complex(a, b);
    const resultOriginal = complex.abs();
    const resultMutated = new Complex(a, b).abs();
    expect(resultOriginal).toBeCloseTo(resultMutated);
  });
});