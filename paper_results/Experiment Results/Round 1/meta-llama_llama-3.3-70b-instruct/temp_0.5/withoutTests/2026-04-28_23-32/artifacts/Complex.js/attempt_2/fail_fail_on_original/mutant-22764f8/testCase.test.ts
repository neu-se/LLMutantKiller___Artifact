import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when calling acot with an empty string property', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.acot()).not.toThrow();
    const mutatedComplex = Object.create(complex);
    mutatedComplex.re = undefined;
    expect(() => mutatedComplex.acot()).toThrow();
  });
});