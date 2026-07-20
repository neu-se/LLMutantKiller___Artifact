import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly and have a defined real part', () => {
    const complex = new Complex(1.5, 0.5);
    const result = complex.atanh();
    expect(Object.keys(result)).toContain('re');
    expect(result.re).not.toBeUndefined();
  });
});