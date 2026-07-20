import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return a valid complex number when subtracting a finite complex number from Infinity', () => {
    const infinity = new Complex(Infinity, Infinity);
    const finite = new Complex(1, 2);
    const result = infinity.sub(finite);
    expect(result.toString()).not.toBe('NaN');
    expect(result.toString()).not.toBeUndefined();
  });
});