import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex Number Parser', () => {
  it('should parse a valid complex number and not throw an error for an invalid type', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
    const invalidComplex = new Complex({ foo: 'bar' });
    expect(invalidComplex.re).toBe(0);
    expect(invalidComplex.im).toBe(0);
  });
});