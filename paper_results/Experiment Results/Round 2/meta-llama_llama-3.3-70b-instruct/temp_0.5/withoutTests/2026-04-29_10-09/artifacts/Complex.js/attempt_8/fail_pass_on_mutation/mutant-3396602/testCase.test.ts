import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(Math.PI / 2, 0);
    const result = complex.csc();
    expect(result.re).toBeCloseTo(1.0);
  });
});