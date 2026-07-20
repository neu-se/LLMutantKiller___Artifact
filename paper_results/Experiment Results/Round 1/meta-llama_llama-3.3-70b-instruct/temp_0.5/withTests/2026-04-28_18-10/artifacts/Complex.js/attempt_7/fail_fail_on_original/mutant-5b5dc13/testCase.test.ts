import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly for a !== 0 and b === 0', () => {
    const complex = new Complex(1, 0);
    expect(complex.acsch().re).toBeCloseTo(0, 5);
    expect(complex.acsch().im).toBeCloseTo(-Infinity, 5);
  });
});