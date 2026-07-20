import { Complex } from './complex';

describe('Complex.js', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    const complex = new Complex(1);
    const result = complex.cos().sub(1).re;
    expect(result).toBeCloseTo(Math.cos(1) - 1, 10);
    const mutatedResult = new Complex(1);
    mutatedResult.cos = function() {
      return new Complex(2);
    };
    expect(mutatedResult.cos().sub(1).re).not.toBeCloseTo(Math.cos(1) - 1, 10);
  });
});