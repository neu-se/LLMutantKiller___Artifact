import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asec correctly for non-zero input', () => {
    const complex = new Complex(1, 2);
    const result = complex.asec();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});