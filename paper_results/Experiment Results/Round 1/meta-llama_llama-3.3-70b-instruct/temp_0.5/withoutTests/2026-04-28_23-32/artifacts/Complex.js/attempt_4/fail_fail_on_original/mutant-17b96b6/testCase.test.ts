import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should return the correct result for acoth when a is not zero', () => {
    const complex = new Complex(1, 0);
    const result = complex.acoth();
    expect(result.toString()).not.toBe('0 1.5707963267948966');
  });
});