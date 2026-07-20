import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly when Math.cosh is defined', () => {
    const originalCosh = Math.cosh;
    Math.cosh = () => 2;
    const complex = new Complex(0, 0);
    expect(complex.cosh()).toEqual(new Complex(2, 0));
    Math.cosh = originalCosh;
  });
});