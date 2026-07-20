import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asinh', () => {
    const complex = new Complex(1, 2);
    const asinh = complex.asinh();
    expect(asinh.re).not.toBeNull();
    expect(asinh.im).not.toBeNull();
  });
});