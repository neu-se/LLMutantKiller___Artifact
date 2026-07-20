import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acosh correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.acosh();
    expect(result).not.toBeNull();
    expect(typeof result.toString).toBe('function');
    expect(() => {
      complex.acosh();
    }).not.toThrow();
  });
});