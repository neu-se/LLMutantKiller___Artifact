import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return Infinity when adding Infinity to any complex number', () => {
    const infinity = new Complex(Infinity, 0);
    const complex = new Complex(1, 2);
    const result = infinity.add(complex);
    expect(result.toString()).toBe('Infinity');
  });

  it('should return a complex number that is not NaN when adding two complex numbers', () => {
    const complex1 = new Complex(1, 2);
    const complex2 = new Complex(3, 4);
    const result = complex1.add(complex2);
    expect(result.isNaN()).toBe(false);
  });
});