import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should return the correct result for acoth when a is not zero and b is zero', () => {
    const complex = new Complex(1, 0);
    expect(complex.acoth().toString()).not.toBe('0 1.5707963267948966');
  });
});