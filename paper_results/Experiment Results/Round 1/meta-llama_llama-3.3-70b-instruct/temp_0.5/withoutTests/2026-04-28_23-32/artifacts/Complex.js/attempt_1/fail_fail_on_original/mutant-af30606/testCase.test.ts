import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex sech', () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(0.26580278492792226, 5);
    expect(result.im).toBeCloseTo(-0.24226845512584853, 5);
  });
});