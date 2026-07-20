import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return correct result for acot function with a = 0 and b = 1', () => {
    const complex = new Complex(0, 1);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});