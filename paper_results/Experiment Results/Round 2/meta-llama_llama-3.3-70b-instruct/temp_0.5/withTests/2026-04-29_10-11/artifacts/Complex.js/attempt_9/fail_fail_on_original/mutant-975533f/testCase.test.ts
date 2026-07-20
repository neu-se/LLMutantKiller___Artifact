import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for acoth', () => {
    const complex1 = new Complex(2, 1);
    const result1 = complex1.acoth();
    const complex2 = new Complex(2, -1);
    const result2 = complex2.acoth();
    expect(result1.im + result2.im).toBeCloseTo(0);
  });
});