import { Complex } from '../complex';

describe('Complex', () => {
  it('should calculate the complex secant correctly for a specific input', () => {
    const complex = new Complex(1, 0);
    const result = complex.sec();
    expect(result.re).toBeCloseTo(1, 6);
    expect(result.im).toBeCloseTo(0, 6);
    const mutatedComplex = new Complex(1, 1);
    const mutatedResult = mutatedComplex.sec();
    expect(mutatedResult.re).not.toBeCloseTo(1, 6);
    expect(mutatedResult.im).not.toBeCloseTo(0, 6);
  });
});