import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acot for non-zero values', () => {
    const c = new Complex(1, 1);
    const result = c.acot();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});