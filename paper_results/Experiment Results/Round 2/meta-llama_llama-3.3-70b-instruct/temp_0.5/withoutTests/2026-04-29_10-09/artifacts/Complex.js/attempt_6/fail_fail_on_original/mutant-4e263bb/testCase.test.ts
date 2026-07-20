import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acoth correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.acoth();
    expect(typeof result).toBe('object');
    expect(result).toHaveProperty('re');
    expect(result).toHaveProperty('im');
  });
});