import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle multiplication of infinity and zero', () => {
    const complex = new Complex(Infinity, 0);
    const zero = new Complex(0, 0);
    const result = complex.mul(zero, 0);
    expect(result).not.toBeNull();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});