import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle negative imaginary part in toString method', () => {
    const complex = new Complex(1, -1);
    expect(complex.toString()).toBe('1 - 1i');
  });
});