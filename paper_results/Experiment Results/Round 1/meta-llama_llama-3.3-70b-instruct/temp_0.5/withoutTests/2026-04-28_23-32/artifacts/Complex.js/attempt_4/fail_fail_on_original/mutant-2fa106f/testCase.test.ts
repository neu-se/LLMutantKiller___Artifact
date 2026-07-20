import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return Infinity for atan when b is 1', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    expect(result.im).toBe(Infinity);
  });
});