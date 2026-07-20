import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle complex acsc calculation correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
    const complexMutated = new Complex(0, 1);
    const resultMutated = complexMutated.acsc();
    expect(resultMutated.im).not.toBeCloseTo(Math.PI / 2, 10);
  });
});