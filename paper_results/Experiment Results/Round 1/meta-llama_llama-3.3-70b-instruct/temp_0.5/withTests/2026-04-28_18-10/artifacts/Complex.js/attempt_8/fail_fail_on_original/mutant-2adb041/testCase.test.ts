import { Complex } from '../complex';

describe('Complex', () => {
  it('should calculate cosm1 correctly for small values', () => {
    const complex = new Complex(0.1);
    const result = complex.expm1();
    const expectedReal = Math.expm1(0.1) * Math.cos(0.1) + Math.cos(0.1) - 1;
    expect(Math.abs(result.re - expectedReal) < 1e-9).toBe(true);
    expect(result.im).toBeCloseTo(0);
  });
});