import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly multiply two complex numbers when both are real', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
  });

  it('should throw an error when trying to access an undefined property in the mul function with mutated code', () => {
    const c1 = new Complex(2, 0);
    const c2 = new Complex(3, 0);
    // Mutated code should throw an error here
    expect(() => c1.mul(c2)).toThrowError();
  });
});