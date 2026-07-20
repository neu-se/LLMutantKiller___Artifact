import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when asinh is called with an invalid this', () => {
    const complex = new Complex(1, 2);
    complex["re"] = "test";
    expect(() => complex.asinh()).toThrowError();
  });
});