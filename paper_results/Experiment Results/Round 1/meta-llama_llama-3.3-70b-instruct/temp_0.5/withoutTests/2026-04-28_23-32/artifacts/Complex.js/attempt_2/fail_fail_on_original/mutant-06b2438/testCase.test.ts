import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should throw an error when calling acosh with an undefined method', () => {
    const complex = new Complex(1, 0);
    expect(() => complex.acosh()).toThrowError();
  });
});