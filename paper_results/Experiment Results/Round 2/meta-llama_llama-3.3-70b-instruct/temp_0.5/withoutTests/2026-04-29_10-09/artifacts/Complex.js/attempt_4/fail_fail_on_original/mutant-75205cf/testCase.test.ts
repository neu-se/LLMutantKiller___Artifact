import { Complex } from "./complex";

describe('Complex', () => {
  it('should return a complex number when subtracting a finite complex number from infinity', () => {
    const infinity = Complex.INFINITY;
    const finite = new Complex(1, 2);
    const result = infinity.sub(finite);
    expect(result.toString()).not.toBe('NaN');
  });
});