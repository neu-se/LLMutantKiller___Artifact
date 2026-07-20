import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing', () => {
  it('should correctly parse complex numbers with negative real and imaginary parts and fail when mutated', () => {
    const complexNumber = new Complex('-1-2i');
    expect(complexNumber.re).toBe(-1);
    expect(complexNumber.im).toBe(-2);
    // The mutation changes the condition in the parse function from plus + minus === 0 to plus - minus === 0.
    // This means that the mutation will incorrectly parse complex numbers with negative real and imaginary parts.
    // Therefore, this test case should pass on the original code and fail on the mutated code.
  });
});