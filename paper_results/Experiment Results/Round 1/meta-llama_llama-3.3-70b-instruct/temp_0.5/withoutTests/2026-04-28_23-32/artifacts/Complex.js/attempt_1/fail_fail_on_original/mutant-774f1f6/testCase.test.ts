import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number when no parameters are provided', () => {
    const complex = new Complex();
    expect(complex.re).toBe(0);
    expect(complex.im).toBe(0);
  });
});