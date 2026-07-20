import { Complex } from './complex';

describe('Complex', () => {
  it('should return the correct result for acsch when the real part is not zero', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    const originalResult = Math.log((1 + Math.sqrt(2)) / 1);
    expect(result.re).toBeCloseTo(originalResult, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});