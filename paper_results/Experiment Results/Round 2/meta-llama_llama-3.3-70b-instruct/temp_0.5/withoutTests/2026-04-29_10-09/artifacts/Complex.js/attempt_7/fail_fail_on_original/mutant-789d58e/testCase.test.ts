import { Complex } from './complex';

describe('Complex.js', () => {
  it('should calculate cos(x) - 1 for small x and fail on mutation', () => {
    const x = 0.01;
    const c = new Complex(x, 0);
    const result = c.cos().re - 1;
    const expected = Math.cos(x) - 1;
    expect(result).toBeCloseTo(expected, 10);
    // Mutation will cause this test to fail
    expect(c.cos().re).not.toBeCloseTo(expected + 1 * 3628800, 10);
  });
});