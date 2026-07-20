import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).not.toBe((false) ? complex.re / 0 : 0);
    expect(result.im).not.toBe((false) ? -complex.im / 0 : 0);
  });
});