import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should calculate cosm1 correctly', () => {
    const complex = new Complex(Math.PI / 4);
    const result = complex.cosm1();
    const expected = Math.cos(Math.PI / 4) - 1;
    expect(Math.abs(result - expected) < 1e-10).toBe(true);
  });
});