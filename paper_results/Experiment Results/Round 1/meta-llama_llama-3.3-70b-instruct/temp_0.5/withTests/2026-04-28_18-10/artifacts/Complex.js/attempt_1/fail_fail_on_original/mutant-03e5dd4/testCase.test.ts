import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should handle whitespace characters correctly', () => {
    // Test with original code: expect to pass
    const complex = new Complex('  1 + 2i  ');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);

    // Test with mutated code: expect to fail
    const mutatedComplex = new Complex('  1 + 2i');
    expect(mutatedComplex.re).toBe(1);
    expect(mutatedComplex.im).toBe(2);
  });
});