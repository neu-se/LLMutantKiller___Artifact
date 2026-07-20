import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a complex number with an imaginary part equal to Infinity when asec is called with 0, 0 on the original code', () => {
    const complex = new Complex(0, 0);
    const result = complex.asec();
    expect(result.im).toBe(Infinity);
  });
});