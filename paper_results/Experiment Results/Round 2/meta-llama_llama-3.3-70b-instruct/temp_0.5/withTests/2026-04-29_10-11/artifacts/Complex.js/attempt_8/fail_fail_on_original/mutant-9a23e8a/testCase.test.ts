import { Complex } from '../complex';

describe('Complex', () => {
  it('should return the correct result for acsch function', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(Math.log(1 + Math.sqrt(2)), 10);
    expect(result.im).toBeCloseTo(0, 10);
    const mutatedComplex = new Complex(1, 0);
    const mutatedResult = mutatedComplex.acsch();
    expect(mutatedResult.re).not.toBeCloseTo(Math.log(1 + Math.sqrt(1/1 + 1)), 10);
  });
});