import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should throw an error when calculating atan for b = -1 in the mutated code', () => {
    const complex = new Complex(0, -1);
    expect(() => complex.atan()).toThrowError();
  });
});