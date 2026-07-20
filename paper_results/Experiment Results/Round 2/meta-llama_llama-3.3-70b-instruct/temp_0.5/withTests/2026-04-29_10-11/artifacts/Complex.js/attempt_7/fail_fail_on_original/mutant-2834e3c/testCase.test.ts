import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should correctly calculate asech for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.asech();
    expect(result).not.toBeNull();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    const mutatedResult = new Complex(1, 1);
    mutatedResult.im = 0;
    const mutatedComplex = new Complex(mutatedResult.re, mutatedResult.im);
    const mutated = mutatedComplex.asech();
    expect(result.im).not.toEqual(mutated.im);
  });
});