import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate cosm1 correctly', () => {
    const complex = new Complex(0.1);
    const result = complex.cosm1();
    expect(result).toBeCloseTo(Math.cos(0.1) - 1, 10);
  });
});