import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should multiply two complex numbers correctly', () => {
    const complex1 = new Complex(1, 0);
    const complex2 = new Complex(1, 0);
    const result = complex1.mul(complex2);
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
  });
});