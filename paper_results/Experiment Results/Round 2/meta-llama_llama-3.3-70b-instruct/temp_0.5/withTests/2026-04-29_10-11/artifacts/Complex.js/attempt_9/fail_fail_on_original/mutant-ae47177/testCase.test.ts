import { Complex } from "./complex";

describe('Complex', () => {
  it('should return the correct result for atan when a is 0 and b is 1', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    if (result.im === Infinity) {
      expect(true).toBe(true);
    } else {
      expect(false).toBe(true);
    }
  });
});