import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle the toString method when the imaginary part is zero', () => {
    const complex = new Complex(1, 0);
    expect(complex.toString()).toBe('1');
    const complex2 = new Complex(1, -0);
    expect(complex2.toString()).toBe('1');
  });
});