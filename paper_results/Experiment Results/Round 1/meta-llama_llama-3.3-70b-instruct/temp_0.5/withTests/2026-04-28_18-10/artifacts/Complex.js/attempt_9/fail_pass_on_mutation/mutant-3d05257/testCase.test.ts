import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acosh correctly for a specific input', () => {
    const complex = new Complex(2, 0);
    const result = complex.acosh();
    const keys = Object.keys(result);
    expect(keys.length).toBe(2);
    expect(keys).toContain('re');
    expect(keys).toContain('im');
  });
});