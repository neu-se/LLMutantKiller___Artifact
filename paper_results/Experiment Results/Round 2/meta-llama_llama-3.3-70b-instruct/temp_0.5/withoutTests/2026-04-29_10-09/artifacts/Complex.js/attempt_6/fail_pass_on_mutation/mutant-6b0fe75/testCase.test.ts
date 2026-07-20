import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh when Math.cosh is defined', () => {
    // Create a new Complex instance
    const complex = new Complex(1, 0);
    
    // Check if Math.cosh is defined
    if (typeof Math.cosh === 'function') {
      const result = complex.cosh();
      expect(result.re).toBeCloseTo(Math.cosh(1)); // If Math.cosh is defined, the result should be equal to Math.cosh(1)
    } else {
      throw new Error('Math.cosh is not defined');
    }
  });
});