import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when multiplying two complex numbers with incorrect property access', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 0);
    expect(() => c1.mul(c2)).toThrowError();
  });
});