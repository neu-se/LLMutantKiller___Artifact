import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh', () => {
    const complex = new Complex(1, 1);
    const result = complex.atanh();
    expect(result.re).toBeFinite();
    expect(result.im).toBeFinite();
  });
});