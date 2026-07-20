import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct result for atan when a is 0 and b is 1 in the original code but not in the mutated code', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    if (result.re === 0 && result.im === Infinity) {
      expect(true).toBe(true);
    } else {
      expect(false).toBe(true);
    }
  });
});