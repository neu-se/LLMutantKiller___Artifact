import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should throw an error when accessing a property that was supposed to be im but was changed to an empty string', () => {
    const complex = new Complex(1, 2);
    complex.asinh();
    expect(() => complex[""]).toThrowError();
  });
});