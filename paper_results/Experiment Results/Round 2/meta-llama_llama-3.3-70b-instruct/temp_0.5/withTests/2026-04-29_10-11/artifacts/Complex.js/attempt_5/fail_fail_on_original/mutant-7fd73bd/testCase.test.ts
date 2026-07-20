import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should calculate log correctly for positive real numbers', () => {
    const c = new Complex(2, 0);
    const result = c.log();
    expect(result.re).toBeCloseTo(Math.log(2));
    expect(result.im).toBeCloseTo(0);

    const c2 = new Complex(1, 0);
    const result2 = c2.log();
    expect(result2.re).toBeCloseTo(0);
    expect(result2.im).toBeCloseTo(0);
  });

  it('should calculate log correctly for the mutated code', () => {
    const c = new Complex(0, 0);
    const result = c.log();
    expect(result.re).not.toBeCloseTo(-Infinity);
  });
});