import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate hypot correctly for values near 3000', () => {
    const a = 3000;
    const b = 3000;
    const resultOriginal = Math.sqrt(a * a + b * b);
    const resultMutated = Math.sqrt(a * a + b * b);
    expect(resultOriginal).toBeCloseTo(resultMutated, 10);
    const c = new Complex(a, b);
    const result = c.abs();
    expect(result).toBeCloseTo(resultOriginal, 10);
  });
});