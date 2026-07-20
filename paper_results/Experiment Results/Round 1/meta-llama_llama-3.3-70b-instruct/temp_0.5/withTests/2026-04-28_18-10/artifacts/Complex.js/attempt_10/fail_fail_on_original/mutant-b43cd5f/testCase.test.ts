import { Complex } from "../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should parse complex numbers with newline characters correctly in the original code and fail in the mutated code', () => {
    const originalComplexNumber = new Complex('1+2i\n');
    expect(originalComplexNumber.re).toBe(1);
    expect(originalComplexNumber.im).toBe(2);

    const mutatedComplexNumber = new Complex('1+2i\n');
    expect(mutatedComplexNumber.re).toBeNaN();
    expect(mutatedComplexNumber.im).toBeNaN();
  });
});