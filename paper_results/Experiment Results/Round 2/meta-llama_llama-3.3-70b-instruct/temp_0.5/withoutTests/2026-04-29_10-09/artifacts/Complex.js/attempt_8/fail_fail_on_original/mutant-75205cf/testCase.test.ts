import { Complex } from "./complex";

describe('Complex', () => {
  it('should return Infinity when subtracting a finite complex number from Infinity', () => {
    const infinity = Complex.INFINITY;
    const finite = new Complex(1, 2);
    const result = infinity.sub(finite);
    expect(result.toString()).toBe('Infinity');
  });
});