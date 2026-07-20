import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acosh for complex numbers', () => {
    const c = new Complex(2, 3);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(-0.5493061443340549);
    expect(result.im).toBeCloseTo(2.7983925228363597);
  });
});