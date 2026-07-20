import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh when Math.cosh is defined', () => {
    // Create a new Complex instance
    const complex = new Complex(1, 0);
    
    // Check if Math.cosh is defined and the cosh function is not using it
    if (typeof Math.cosh === 'function' && complex.cosh().re !== Math.cosh(1)) {
      throw new Error('cosh function is not using Math.cosh');
    }
  });
});