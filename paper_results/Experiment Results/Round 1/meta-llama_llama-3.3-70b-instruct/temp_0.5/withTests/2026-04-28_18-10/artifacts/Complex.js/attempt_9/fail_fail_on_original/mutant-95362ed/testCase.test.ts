import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex Number Parser', () => {
  it('should throw an error for an invalid type', () => {
    const invalidComplex = { foo: 'bar' };
    const c = new Complex(invalidComplex);
    expect(c.re).toBeNaN();
    expect(c.im).toBeNaN();
  });
});