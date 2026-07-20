import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when accessing an undefined property in the clone method', () => {
    const complex = new Complex(1, 2);
    const clonedComplex = complex.clone();
    expect(clonedComplex.re).toBe(1);
    expect(clonedComplex.im).toBe(2);
    expect(() => clonedComplex[""]).toThrowError();
  });
});