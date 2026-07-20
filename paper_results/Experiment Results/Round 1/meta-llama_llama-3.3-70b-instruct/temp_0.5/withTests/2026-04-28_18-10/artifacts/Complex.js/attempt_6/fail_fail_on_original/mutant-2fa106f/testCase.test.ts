import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return a Complex object when atan is called', () => {
    const complex = new Complex(1, 0);
    const result = complex.atan();
    expect(result).toBeInstanceOf(Complex);
  });
});