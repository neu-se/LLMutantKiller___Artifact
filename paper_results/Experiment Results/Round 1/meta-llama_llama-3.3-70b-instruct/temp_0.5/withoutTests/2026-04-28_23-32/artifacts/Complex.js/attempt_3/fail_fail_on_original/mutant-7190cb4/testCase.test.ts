import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acsc for a complex number with positive imaginary part', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0, 5);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 5);
  });
});