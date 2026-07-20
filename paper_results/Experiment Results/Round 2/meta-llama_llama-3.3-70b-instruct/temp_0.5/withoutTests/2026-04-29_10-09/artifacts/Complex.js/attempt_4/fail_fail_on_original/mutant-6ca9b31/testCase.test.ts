import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle negative imaginary part when converting to string', () => {
    const complex = new Complex(1, -1);
    expect(complex.toString()).toBe('1 - 1i');
    const complex2 = new Complex(1, 0);
    expect(complex2.toString()).toBe('1');
    const complex3 = new Complex(1, -0);
    expect(complex3.toString()).toBe('1');
  });
});