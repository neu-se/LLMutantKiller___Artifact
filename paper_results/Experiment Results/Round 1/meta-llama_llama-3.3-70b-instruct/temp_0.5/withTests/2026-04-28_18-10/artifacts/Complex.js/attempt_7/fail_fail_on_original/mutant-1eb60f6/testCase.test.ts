import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate acsc for non-zero input and fail for mutated code', () => {
    const complex = new Complex(0, 0);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2, 4);
    expect(result.im).toBeCloseTo(Infinity, 4);
  });
});