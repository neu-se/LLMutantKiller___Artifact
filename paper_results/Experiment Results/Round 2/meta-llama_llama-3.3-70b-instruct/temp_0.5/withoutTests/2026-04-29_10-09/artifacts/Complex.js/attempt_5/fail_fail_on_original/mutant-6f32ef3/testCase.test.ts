import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle the toString method when the imaginary part is negative zero', () => {
    const complex = new Complex(1, -0);
    expect(complex.toString()).toBe('1');
  });
});