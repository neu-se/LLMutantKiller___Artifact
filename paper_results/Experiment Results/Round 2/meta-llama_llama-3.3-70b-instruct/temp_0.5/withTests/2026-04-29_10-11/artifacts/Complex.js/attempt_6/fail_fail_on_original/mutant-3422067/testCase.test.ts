import { Complex } from './complex';

describe('Complex.js', () => {
  it('should return the correct result for hypot function when a is less than b', () => {
    const a = 3000;
    const b = 3001;
    const result = new Complex(a, b).abs();
    expect(result).toBeCloseTo(Math.sqrt(a * a + b * b));
  });
});