import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return the correct result for acsc function', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.toString()).toBe('0 -1.5707963267948966i');
  });
});