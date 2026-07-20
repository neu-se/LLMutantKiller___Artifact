import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when cosh is not implemented', () => {
    const complex = new Complex(10, 0);
    const coshSpy = jest.spyOn(complex, 'cosh');
    expect(coshSpy).toThrowError();
    complex.cosh();
  });
});