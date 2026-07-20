import { Complex } from "./complex.js";

describe('Complex Number Parser', () => {
  it('should throw an error for an invalid type', () => {
    const invalidComplex = { foo: 'bar' };
    expect(() => new Complex(invalidComplex)).toThrow();
    const validComplex = new Complex(1, 2);
    expect(validComplex.re).toBe(1);
    expect(validComplex.im).toBe(2);
  });
});