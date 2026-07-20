import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a finite value when asec is called with a non-zero complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.asec();
    expect(result.re).toBeFinite();
    expect(result.im).toBeFinite();
  });
});