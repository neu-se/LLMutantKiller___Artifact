import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle null input correctly', () => {
    const complex = new Complex(null);
    expect(complex.re).toBe(0);
    expect(complex.im).toBe(0);
  });
});