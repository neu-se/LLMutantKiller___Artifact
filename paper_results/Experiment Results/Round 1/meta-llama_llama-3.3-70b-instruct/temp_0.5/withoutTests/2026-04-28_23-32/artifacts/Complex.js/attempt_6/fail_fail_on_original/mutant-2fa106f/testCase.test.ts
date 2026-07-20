import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should return Infinity for atan when b is 1 and a finite number for atan when b is not 1', () => {
    const complex1 = new Complex(0, 1);
    const complex2 = new Complex(0, 2);
    const result1 = complex1.atan();
    const result2 = complex2.atan();
    expect(result1.im).toBe(Infinity);
    expect(result2.im).toBeFinite();
  });
});