import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when calculating atanh with a complex number that has an undefined property', () => {
    const complex = new Complex(1, 0);
    complex.atanh = function() {
      const x = new Complex(1, 0);
      x['im'] = -x[""];
      return x;
    };
    expect(() => complex.atanh()).toThrowError();
  });
});