import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should multiply correctly', () => {
    const complex = new Complex(Infinity, 0);
    const zero = new Complex(0, 0);
    const result = complex.mul(zero, 0);
    expect(result.re).toBeNaN();
    expect(result.im).toBeNaN();
  });
});