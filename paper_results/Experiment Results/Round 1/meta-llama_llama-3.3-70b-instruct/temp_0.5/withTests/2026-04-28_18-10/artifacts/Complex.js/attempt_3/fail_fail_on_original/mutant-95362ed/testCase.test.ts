import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex Number Parser', () => {
  it('should parse a complex number correctly', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
  });

  it('should throw an error when parsing an invalid complex number', () => {
    expect(() => new Complex({ foo: 'bar' })).toThrow();
  });
});