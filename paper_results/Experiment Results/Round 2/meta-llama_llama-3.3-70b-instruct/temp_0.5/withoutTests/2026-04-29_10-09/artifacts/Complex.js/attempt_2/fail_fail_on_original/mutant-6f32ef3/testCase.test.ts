import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle the toString method when the imaginary part is negative', () => {
    const complex = new Complex(1, -0.5);
    expect(complex.toString()).toBe('1 - 0.5i');
  });
});