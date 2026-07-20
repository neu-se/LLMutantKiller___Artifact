import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return correct result for acot function with a = 0 and b = 0', () => {
    const complex = new Complex(0, 0);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
  });
});