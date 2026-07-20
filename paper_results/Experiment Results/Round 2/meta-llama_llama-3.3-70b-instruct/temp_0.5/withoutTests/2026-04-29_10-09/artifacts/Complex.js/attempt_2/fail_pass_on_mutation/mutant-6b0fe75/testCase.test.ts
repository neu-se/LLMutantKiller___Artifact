import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh when Math.cosh is defined', () => {
    // Check if Math.cosh is defined
    if (typeof Math.cosh === 'function') {
      // Create a new Complex instance
      const complex = new Complex(1, 0);
      
      // Calculate cosh
      const result = complex.cosh();
      
      // Check if the result is correct
      expect(result.re).toBeCloseTo(Math.cosh(1));
      expect(result.im).toBeCloseTo(0);
    } else {
      throw new Error('Math.cosh is not defined');
    }
  });
});