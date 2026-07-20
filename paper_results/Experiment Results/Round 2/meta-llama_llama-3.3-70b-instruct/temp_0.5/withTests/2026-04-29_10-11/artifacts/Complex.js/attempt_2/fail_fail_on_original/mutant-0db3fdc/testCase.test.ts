import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should correctly calculate cosm1', () => {
    const complex = new Complex(Math.PI / 4);
    const result = complex.cosm1();
    const expected = Math.cos(complex.re) - 1;
    expect(result).toBeCloseTo(expected, 10);
  });
});