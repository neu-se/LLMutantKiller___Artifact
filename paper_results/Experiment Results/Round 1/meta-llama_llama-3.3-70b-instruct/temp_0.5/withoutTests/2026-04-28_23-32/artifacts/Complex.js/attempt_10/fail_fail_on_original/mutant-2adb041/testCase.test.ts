import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate expm1 correctly', () => {
    const complex = new Complex(1);
    const result = complex.cosm1();
    const expected = Math.cos(1) - 1;
    expect(result).toBeCloseTo(expected, 10);
  });
});