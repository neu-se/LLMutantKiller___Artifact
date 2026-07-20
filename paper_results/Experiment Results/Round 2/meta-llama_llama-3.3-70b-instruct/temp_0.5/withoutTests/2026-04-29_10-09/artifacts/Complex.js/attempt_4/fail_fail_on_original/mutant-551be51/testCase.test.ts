import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return a complex number when calling ceil on a complex number', () => {
    const complex = new Complex(1.2, 3.4);
    const result = complex.ceil(1);
    expect(result).toBeInstanceOf(Complex);
  });
});