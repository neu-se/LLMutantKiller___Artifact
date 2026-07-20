import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when acoth is called with a complex number that has a zero denominator', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acoth()).toThrow();
  });
});