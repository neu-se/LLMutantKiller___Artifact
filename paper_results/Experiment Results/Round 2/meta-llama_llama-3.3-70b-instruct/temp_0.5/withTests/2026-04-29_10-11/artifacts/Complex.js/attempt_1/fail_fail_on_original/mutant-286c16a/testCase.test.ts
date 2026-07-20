import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate the complex asinh of a complex number', () => {
    const complex = new Complex('1+2i');
    const asinh = complex.asinh();
    expect(asinh.re).not.toBeNull();
    expect(asinh.im).not.toBeNull();
  });
});