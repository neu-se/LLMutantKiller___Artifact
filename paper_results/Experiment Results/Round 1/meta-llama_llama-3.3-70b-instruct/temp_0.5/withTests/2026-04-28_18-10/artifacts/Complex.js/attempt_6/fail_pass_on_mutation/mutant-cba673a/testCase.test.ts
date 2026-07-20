import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(2, 0);
    const coshSpy = jest.spyOn(complex, 'cosh');
    complex.cosh();
    expect(coshSpy).toHaveBeenCalledTimes(1);
    expect(coshSpy).toHaveReturnedWith(expect.objectContaining({
      re: expect.any(Number),
      im: expect.any(Number),
    }));
  });
});