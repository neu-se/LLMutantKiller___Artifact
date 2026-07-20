import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should throw an error when calling an empty string method', () => {
    const complex = new Complex(1, 0);
    expect(() => complex[""]()).toThrowError();
  });
});