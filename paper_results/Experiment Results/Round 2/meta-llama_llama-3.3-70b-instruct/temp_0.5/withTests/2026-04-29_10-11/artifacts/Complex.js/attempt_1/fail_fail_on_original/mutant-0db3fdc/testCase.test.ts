import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly calculate cosm1', () => {
    const complex = new Complex(1);
    const result = complex.exp().sub(1);
    const expected = complex.expm1();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});