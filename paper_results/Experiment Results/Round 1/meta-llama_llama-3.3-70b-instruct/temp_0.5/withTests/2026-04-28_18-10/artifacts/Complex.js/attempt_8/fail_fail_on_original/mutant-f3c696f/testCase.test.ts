import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly calculate acot for a complex number', () => {
    const complex = new Complex(0, 1);
    const result = complex.acot();
    expect(result.im).toBeCloseTo(-Math.PI / 2);
    const mutatedComplex = new Complex(0, -1);
    const mutatedResult = mutatedComplex.acot();
    expect(mutatedResult.im).not.toBeCloseTo(result.im);
  });
});