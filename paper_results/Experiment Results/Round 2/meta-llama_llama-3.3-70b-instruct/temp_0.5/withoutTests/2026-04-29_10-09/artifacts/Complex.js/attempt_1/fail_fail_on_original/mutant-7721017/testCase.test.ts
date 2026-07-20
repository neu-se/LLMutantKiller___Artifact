import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should correctly calculate the power of two complex numbers', () => {
    const z = new Complex(0, 0);
    const result = z.pow(1, 0);
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
  });
});