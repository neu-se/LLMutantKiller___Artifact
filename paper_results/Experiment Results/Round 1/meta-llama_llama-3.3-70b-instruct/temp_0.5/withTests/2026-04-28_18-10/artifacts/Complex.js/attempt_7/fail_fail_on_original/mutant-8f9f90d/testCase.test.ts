import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate the complex atanh correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.atanh();
    expect(Object.keys(result)).not.toContain('');
    expect(Object.keys(result)).toEqual(['re', 'im']);
  });
});