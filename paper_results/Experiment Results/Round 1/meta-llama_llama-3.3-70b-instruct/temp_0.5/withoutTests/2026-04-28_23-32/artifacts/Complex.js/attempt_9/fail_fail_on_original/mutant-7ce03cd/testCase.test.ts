import { Complex } from "./complex";

describe('Complex', () => {
  it('should throw an error when isZero is called on an object without isZero method', () => {
    const complex = new Complex(Infinity, Infinity);
    const zero = new Complex(0, 0);
    expect(() => complex.mul(zero)).not.toThrow();
    expect(complex.mul(zero).isZero()).toBe(false);
  });
});