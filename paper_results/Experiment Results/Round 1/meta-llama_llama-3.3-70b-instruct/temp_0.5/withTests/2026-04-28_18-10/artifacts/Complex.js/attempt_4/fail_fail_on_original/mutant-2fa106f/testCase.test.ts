import { Complex } from "./complex";

describe('Complex', () => {
  it('should throw an error when atan is called with b equal to 1 and a equal to 0 in the mutated code', () => {
    const complex = new Complex(0, 1);
    expect(() => complex.atan()).toThrowError();
  });
});