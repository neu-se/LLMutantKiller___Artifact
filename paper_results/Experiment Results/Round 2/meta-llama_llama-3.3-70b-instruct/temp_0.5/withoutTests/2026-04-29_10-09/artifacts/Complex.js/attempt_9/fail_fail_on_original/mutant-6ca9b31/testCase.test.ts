import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle negative and zero imaginary part when converting to string', () => {
    const complex = new Complex(1, -0);
    expect(complex.toString()).not.toBe('1 - 0i');
    const complex2 = new Complex(1, 0);
    expect(complex2.toString()).not.toBe('1 - 0i');
    const complex3 = new Complex(1, -1);
    expect(complex3.toString()).toBe('1 - 1i');
  });
});