import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle acsc correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    const a = complex.re;
    const b = complex.im;
    expect(result.re).not.toBe(a / 0);
  });
});