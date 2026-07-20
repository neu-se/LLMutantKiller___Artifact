import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate expm1 correctly for small input', () => {
    const complex = new Complex(0.0001, 0);
    const result = complex.expm1();
    const expectedRe = Math.expm1(0.0001);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});