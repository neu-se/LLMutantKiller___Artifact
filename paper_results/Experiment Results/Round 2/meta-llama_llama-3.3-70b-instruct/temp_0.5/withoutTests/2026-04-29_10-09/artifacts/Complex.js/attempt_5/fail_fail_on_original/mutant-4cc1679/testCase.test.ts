import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acosh correctly', () => {
    const complex = new Complex(2, 0);
    expect(() => {
      const result = complex.acosh();
      expect(result.toString()).not.toBeUndefined();
    }).not.toThrow();
  });
});