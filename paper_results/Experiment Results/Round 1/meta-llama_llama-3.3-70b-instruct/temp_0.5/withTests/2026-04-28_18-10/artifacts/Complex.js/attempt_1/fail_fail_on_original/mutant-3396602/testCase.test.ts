import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosecans', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    expect(result.re).toBeCloseTo(-0.2718281828459045, 10);
    expect(result.im).toBeCloseTo(0.27182818284590453, 10);
  });
});