import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex sinh correctly for non-zero input', () => {
    const c = new Complex(1, 1);
    const result = c.sinh();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
  });
});