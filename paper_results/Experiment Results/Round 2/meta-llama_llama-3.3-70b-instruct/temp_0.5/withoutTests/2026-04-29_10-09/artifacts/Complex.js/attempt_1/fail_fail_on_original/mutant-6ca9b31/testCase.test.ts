import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle negative imaginary part when converting to string', () => {
    const complex = new Complex(1, -2);
    expect(complex.toString()).toBe('1 - 2i');
  });
});