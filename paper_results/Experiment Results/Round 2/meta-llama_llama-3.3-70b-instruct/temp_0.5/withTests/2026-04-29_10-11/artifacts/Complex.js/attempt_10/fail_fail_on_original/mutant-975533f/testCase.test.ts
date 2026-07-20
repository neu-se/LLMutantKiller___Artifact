import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for acoth', () => {
    const complex1 = new Complex(1, 1);
    const complex2 = new Complex(1, -1);
    const result1 = complex1.acoth();
    const result2 = complex2.acoth();
    expect(result1.im).toBeCloseTo(-result2.im);
  });
});