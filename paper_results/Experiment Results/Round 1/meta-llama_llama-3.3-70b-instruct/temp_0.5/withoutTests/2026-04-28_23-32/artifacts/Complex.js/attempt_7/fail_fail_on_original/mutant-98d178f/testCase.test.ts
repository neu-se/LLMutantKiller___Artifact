import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when atanh is called with a complex number that has an invalid property', () => {
    const complex = new Complex(1, 2);
    complex[""] = 3;
    expect(() => complex.atanh()).toThrow();
  });
});