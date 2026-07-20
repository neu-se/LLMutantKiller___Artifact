import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return correct result for expm1 function', () => {
    const complex = new Complex(0.1);
    const result = complex.expm1();
    expect(result.re).toBeCloseTo(0.105171);
    expect(result.im).toBeCloseTo(0.099833);
  });
});