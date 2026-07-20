import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acsc for non-zero complex number', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(-0.223891, 5);
    expect(result.im).toBeCloseTo(-0.974368, 5);
  });
});