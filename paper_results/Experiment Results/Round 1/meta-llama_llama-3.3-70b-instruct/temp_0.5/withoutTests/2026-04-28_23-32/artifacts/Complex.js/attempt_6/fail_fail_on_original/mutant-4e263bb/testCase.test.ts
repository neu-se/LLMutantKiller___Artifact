import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when accessing undefined property in acoth', () => {
    const complex = new Complex(1, 2);
    const originalAcoth = complex.acoth;
    complex.acoth = function() {
      var a = this[""];
      var b = this['im'];
      // rest of the function
    };
    expect(() => complex.acoth()).toThrowError();
  });
});