import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return infinity when subtracting a finite complex number from infinity', () => {
    const infinity = Complex.INFINITY;
    const finite = new Complex(1, 2);
    const result = infinity.sub(finite);
    expect(result.toString()).toBe('Infinity');
  });
});