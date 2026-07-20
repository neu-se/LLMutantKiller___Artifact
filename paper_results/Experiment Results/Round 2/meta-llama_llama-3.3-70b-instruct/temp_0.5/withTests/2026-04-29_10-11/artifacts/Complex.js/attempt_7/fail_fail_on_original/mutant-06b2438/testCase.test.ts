import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when calling acosh with undefined method', () => {
    const complex = new Complex(2, 0);
    expect(() => complex["acosh"]()).not.toThrowError();
    expect(() => complex[""]()).toThrowError();
  });
});