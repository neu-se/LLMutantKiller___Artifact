import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when trying to access an undefined property', () => {
    const complex = new Complex(1, 2);
    expect(() => complex[""]).toThrowError(SyntaxError);
  });
});