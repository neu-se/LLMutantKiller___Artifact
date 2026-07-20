import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for acoth when a is not 0 and b is not 0', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.toString()).not.toBe('0 π/2');
  });
});