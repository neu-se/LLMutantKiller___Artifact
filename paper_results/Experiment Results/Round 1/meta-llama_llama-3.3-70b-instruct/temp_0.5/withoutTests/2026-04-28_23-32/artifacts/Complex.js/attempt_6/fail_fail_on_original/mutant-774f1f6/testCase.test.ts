import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly parse a complex number when an object with no real part is provided', () => {
    const complex = new Complex({ im: 1 });
    expect(complex.re).toBe(0);
    expect(complex.im).toBe(1);
  });
});