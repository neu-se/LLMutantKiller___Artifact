import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return a complex number when calculating atan for b = -1', () => {
    const complex = new Complex(0, -1);
    const result = complex.atan();
    expect(result).toBeInstanceOf(Complex);
  });
});