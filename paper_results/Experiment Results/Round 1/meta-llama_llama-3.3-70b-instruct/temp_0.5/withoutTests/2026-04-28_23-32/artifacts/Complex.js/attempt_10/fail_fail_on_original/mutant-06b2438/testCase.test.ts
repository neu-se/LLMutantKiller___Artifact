import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should not throw an error when calling atanh and the result should be a complex number', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.atanh();
    expect(result).toBeInstanceOf(Complex);
  });
});