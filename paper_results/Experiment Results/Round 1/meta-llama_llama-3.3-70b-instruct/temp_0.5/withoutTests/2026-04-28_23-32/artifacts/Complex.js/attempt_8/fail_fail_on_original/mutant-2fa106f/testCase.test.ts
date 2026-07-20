import { Complex } from "../../../../../complex.js";

describe('Complex', () => {
  it('should throw no error when b is 1 and return a result for atan when b is not 1', () => {
    const complex1 = new Complex(0, 1);
    const complex2 = new Complex(0, 2);
    expect(() => complex1.atan()).not.toThrow();
    const result2 = complex2.atan();
    expect(result2).toBeDefined();
  });
});