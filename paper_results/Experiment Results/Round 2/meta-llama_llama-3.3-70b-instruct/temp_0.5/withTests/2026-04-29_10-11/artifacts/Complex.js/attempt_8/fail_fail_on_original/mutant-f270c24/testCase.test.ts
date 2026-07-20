import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly calculate acsch for real numbers', () => {
    const c = new Complex(1, 0);
    const result = c.acsch();
    expect(result.re).not.toBe(Infinity);
    expect(result.im).toBeCloseTo(0, 10);
  });
});