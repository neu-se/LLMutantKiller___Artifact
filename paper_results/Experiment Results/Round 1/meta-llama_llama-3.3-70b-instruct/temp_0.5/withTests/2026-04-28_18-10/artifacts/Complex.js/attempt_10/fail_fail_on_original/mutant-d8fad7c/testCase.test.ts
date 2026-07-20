import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate acsch correctly for a non-zero input', () => {
    const c = new Complex(2, 0);
    const result = c.acsch();
    expect(result.re).not.toBe(Infinity);
    expect(result.im).toBeCloseTo(0, 10);
  });

  it('should calculate acsch correctly for a zero input', () => {
    const c = new Complex(0, 0);
    const result = c.acsch();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});