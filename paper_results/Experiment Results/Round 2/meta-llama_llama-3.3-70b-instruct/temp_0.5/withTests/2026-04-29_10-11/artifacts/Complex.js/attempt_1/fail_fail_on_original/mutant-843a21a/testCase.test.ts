import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('asech should return the correct result for a non-zero complex number', () => {
    const complex = new Complex(1, 2);
    const result = complex.asech();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});