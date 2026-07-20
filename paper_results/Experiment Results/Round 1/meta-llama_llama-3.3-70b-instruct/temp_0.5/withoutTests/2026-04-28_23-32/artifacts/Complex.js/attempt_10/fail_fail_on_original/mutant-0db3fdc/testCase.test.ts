import { Complex } from '../complex';

describe('Complex', () => {
  it('should return the correct result for cosm1 function', () => {
    const x = 0.1;
    const complex = new Complex(x);
    const resultOriginal = Math.cos(x) - 1;
    const result = complex.cosm1();
    expect(result).toBeCloseTo(resultOriginal, 10);
    const mutatedResult = (x * x) / ((x * x) / 20922789888000 - 1 / 87178291200);
    expect(result).not.toBeCloseTo(mutatedResult, 10);
  });
});