import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number when null is provided as the first argument and no second argument is provided', () => {
    const complex = new Complex(null);
    expect(complex.re).toBe(0);
    expect(complex.im).toBe(0);
  });
});