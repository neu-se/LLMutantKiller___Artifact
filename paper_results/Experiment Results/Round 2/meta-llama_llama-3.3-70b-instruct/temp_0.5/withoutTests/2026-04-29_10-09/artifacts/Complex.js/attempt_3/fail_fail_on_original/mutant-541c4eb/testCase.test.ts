import { Complex } from "./complex";

describe('Complex', () => {
  it('should throw an error when asinh is called with an invalid this', () => {
    const complex = new Complex(1, 2);
    complex[""] = 10;
    expect(() => complex.asinh()).toThrowError();
  });
});