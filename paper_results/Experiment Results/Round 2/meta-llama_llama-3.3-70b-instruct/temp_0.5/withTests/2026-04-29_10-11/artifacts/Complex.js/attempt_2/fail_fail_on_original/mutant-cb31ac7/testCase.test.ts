import { Complex } from '../complex';

describe('Complex', () => {
  it('should calculate cosm1 correctly', () => {
    const complex = new Complex(0.1, 0);
    const result = complex.expm1();
    const expected = Math.expm1(0.1);
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});