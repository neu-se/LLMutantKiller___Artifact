import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should initialize complex number correctly', () => {
    const complex = new Complex(2, 3);
    const keys = Object.keys(complex);
    expect(keys.includes('re')).toBe(true);
    expect(keys.includes('im')).toBe(true);
    expect(keys.length).toBe(2);
  });
});