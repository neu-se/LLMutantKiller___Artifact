import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should throw an error when calling acot with undefined property', () => {
    const complex = new Complex(1, 2);
    const result = complex.acot();
    expect(result).toBeDefined();
    const mutatedComplex = new Complex(1, undefined);
    expect(() => mutatedComplex.acot()).toThrow();
  });
});