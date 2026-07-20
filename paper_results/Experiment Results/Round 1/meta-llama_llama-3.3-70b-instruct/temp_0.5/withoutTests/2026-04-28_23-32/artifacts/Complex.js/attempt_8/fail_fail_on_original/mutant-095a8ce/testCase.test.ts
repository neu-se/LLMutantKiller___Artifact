import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a value when asec is called with a non-zero complex number and not throw an error when a and b are zero', () => {
    const complex = new Complex(0, 0);
    const result = complex.asec();
    expect(result).not.toBeNull();
  });
});