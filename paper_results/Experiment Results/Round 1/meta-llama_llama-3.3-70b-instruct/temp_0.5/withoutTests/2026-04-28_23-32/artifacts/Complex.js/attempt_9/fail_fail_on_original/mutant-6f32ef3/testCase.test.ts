import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle negative imaginary part in toString method', () => {
    const complex = new Complex(0, 0);
    const complex2 = new Complex(0, -0);
    expect(complex.toString()).toBe(complex2.toString());
  });
});