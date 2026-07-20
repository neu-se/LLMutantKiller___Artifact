import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle negative imaginary part in toString method', () => {
    const complex = new Complex(1, 0);
    expect(complex.toString()).toBe('1');
    const complex2 = new Complex(1, -0);
    expect(complex2.toString()).not.toBe('-0+1i');
  });
});