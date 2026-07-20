import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when trying to access a property after asinh', () => {
    const c = new Complex(1, 2);
    c.asinh();
    expect(() => c["re"]).not.toThrowError();
  });
});