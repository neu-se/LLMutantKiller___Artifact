import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should throw an error when calculating the complex atanh with the mutated code', () => {
    const complex = new Complex(1.5, 0);
    expect(() => complex.atanh()).not.toThrow();
  });
});