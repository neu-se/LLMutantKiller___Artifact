import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth for a complex number', () => {
    const complex = new Complex(1, 2);
    const result = complex.acoth();
    expect(result.re).not.toBe(1 / 0);
    expect(result.im).not.toBe(-1 / 0);
  });
});