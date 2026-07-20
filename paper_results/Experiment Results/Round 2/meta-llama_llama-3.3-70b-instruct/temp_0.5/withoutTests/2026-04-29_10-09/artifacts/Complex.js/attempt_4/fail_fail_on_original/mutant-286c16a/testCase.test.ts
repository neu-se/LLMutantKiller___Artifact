import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should throw an error when asinh is called on the mutated code', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.asinh()).toThrowError();
  });
});