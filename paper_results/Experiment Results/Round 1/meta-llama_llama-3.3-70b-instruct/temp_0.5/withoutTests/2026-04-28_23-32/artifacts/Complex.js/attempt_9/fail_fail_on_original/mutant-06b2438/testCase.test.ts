import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should not throw an error when calling atanh', () => {
    const complex = new Complex(0.5, 0);
    expect(() => complex.atanh()).not.toThrowError();
  });
});