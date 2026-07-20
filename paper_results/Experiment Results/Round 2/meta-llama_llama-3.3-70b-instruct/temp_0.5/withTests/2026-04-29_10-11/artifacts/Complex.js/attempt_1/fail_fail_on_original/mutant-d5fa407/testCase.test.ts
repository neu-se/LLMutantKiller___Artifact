import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 1);
    const acot = complex.acot();
    expect(acot.re).toBeCloseTo(0.5, 10);
    expect(acot.im).toBeCloseTo(-0.5, 10);
  });
});