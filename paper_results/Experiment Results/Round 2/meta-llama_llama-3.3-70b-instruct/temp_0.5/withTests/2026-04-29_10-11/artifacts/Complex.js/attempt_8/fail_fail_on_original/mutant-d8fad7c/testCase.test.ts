import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return Infinity when the condition (a !== 0) is not met for acsch', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(Infinity, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});