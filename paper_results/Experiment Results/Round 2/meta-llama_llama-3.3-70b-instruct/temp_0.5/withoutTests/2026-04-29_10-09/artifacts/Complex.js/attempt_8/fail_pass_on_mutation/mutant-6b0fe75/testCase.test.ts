import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh when Math.cosh is defined', () => {
    // Create a new Complex instance
    const complex = new Complex(1, 0);
    
    // Check if Math.cosh is defined
    if (typeof Math.cosh === 'function') {
      const originalCosh = Math.cosh;
      Math.cosh = undefined;
      const result = complex.cosh();
      Math.cosh = originalCosh; // Restore the original Math.cosh function
      expect(result.re).toBeCloseTo((Math.exp(1) + Math.exp(-1)) * 0.5); // If we reach this point, cosh function used its own implementation
    } else {
      throw new Error('Math.cosh is not defined');
    }
  });
});