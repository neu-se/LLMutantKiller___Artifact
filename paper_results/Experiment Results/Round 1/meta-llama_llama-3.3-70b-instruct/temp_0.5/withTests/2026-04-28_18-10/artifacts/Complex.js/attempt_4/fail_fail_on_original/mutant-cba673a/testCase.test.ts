import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when cosh is not implemented', () => {
    const complex = new Complex(2, 0);
    const cosh = Complex.prototype.cosh;
    Complex.prototype.cosh = function() {};
    expect(() => complex.cosh()).toThrowError();
    Complex.prototype.cosh = cosh;
  });
});