import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.csc();
    expect(result).toBeInstanceOf(Complex);
    expect(result.re).toBeFinite();
    expect(result.im).toBeFinite();
  });
});