import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asech of a non-zero complex number correctly', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.toString()).not.toBe('Infinity');
  });
});