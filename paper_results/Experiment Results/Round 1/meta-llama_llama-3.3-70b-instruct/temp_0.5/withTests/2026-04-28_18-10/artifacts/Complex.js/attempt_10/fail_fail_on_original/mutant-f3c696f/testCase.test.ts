import { Complex } from '../../complex';

describe('Complex', () => {
  it('should correctly calculate acot for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(Math.atan2(1, 1));
    expect(result.im).toBeCloseTo(0);
    const mutatedComplex = new Complex(1, -1);
    const mutatedResult = mutatedComplex.acot();
    expect(mutatedResult.im).not.toBeCloseTo(result.im);
  });
});