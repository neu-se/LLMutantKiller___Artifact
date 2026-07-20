import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh when Math.cosh is not defined', () => {
    // Save the original Math.cosh function
    const originalCosh = Math.cosh;
    
    // Delete Math.cosh to simulate it being undefined
    delete Math.cosh;
    
    // Create a new Complex instance
    const complex = new Complex(1, 0);
    
    // Calculate cosh
    const result = complex.cosh();
    
    // Restore the original Math.cosh function
    Math.cosh = originalCosh;
    
    // Check if the result is correct
    expect(result.re).toBeCloseTo(1.5430806348152437);
    expect(result.im).toBeCloseTo(0);
  });
});