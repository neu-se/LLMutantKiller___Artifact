import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot method', () => {
  it('should correctly handle non-zero imaginary part when real part is zero', () => {
    const c = new Complex(0, 1);
    const result = c.acot();
    // The original code should handle this case correctly
    // The mutated code will incorrectly use 'false' instead of checking (b !== 0)
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});