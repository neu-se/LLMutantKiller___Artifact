import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh when Math.cosh is defined', () => {
    // Create a new Complex instance
    const complex = new Complex(1, 0);
    
    // Check if Math.cosh is defined
    const originalCosh = Math.cosh;
    Math.cosh = function(x) { return x; }; // Mock Math.cosh to return x
    const result = complex.cosh();
    Math.cosh = originalCosh; // Restore the original Math.cosh function
    expect(result.re).toBeCloseTo(Math.cosh(1)); // If Math.cosh is used, the result should be equal to Math.cosh(1)
  });
});