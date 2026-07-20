import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a complex number with a real part equal to 0 when asec is called with 0, 0 on the original code', () => {
    const complex = new Complex(0, 0);
    const result = complex.asec();
    expect(result.re).toBe(0);
  });
});