import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return correct result for acot function with b = 0', () => {
    const complex = new Complex(1, 0);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});