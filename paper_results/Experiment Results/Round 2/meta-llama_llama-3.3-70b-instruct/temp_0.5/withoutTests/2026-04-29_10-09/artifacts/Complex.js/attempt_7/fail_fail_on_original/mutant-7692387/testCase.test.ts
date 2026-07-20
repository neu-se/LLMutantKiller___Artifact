import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when accessing a non-existent property after asinh', () => {
    const complex = new Complex(1, 2);
    complex.asinh();
    expect(() => complex[""]).toThrowError();
  });
});