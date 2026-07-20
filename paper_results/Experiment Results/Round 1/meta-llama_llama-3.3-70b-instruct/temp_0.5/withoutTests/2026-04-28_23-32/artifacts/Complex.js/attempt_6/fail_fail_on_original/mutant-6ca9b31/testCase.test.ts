import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct string representation for a complex number with zero imaginary part', () => {
    const complex = new Complex(1, 0);
    expect(complex.toString()).toBe('1');
    const complex2 = new Complex(0, 0);
    expect(complex2.toString()).toBe('0');
    const complex3 = new Complex(0, -1);
    expect(complex3.toString()).toBe('-1i');
    const complex4 = new Complex(0, -0);
    expect(complex4.toString()).toBe('0');
  });
});