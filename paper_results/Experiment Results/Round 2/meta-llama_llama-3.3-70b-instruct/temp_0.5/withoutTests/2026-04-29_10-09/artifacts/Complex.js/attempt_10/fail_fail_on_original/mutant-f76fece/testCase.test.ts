import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers', () => {
    const complex1 = new Complex(1.0, 1.0);
    const complex2 = new Complex(1.0, 1.0 + Complex['EPSILON']);
    expect(complex1.equals(complex2)).toBe(true); 
  });
});