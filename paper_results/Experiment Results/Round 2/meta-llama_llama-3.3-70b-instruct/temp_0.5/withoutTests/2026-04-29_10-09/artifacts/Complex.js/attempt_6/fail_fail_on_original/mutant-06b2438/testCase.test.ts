import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when calling acosh with an invalid method call', () => {
    const complex = new Complex(2, 0);
    const originalAcosh = complex.acosh;
    complex.acosh = function() { return this[""](); };
    expect(() => complex.acosh()).toThrowError();
  });
});