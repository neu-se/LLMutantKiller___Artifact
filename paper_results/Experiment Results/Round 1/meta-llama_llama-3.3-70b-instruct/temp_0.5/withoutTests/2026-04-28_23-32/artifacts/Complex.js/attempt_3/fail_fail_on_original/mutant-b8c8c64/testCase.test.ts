import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when trying to multiply two complex numbers with an empty property', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(0, 0);
    expect(() => c1.mul(c2)).toThrow();
  });
});