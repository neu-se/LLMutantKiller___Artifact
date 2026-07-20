import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(Math.PI / 4, 0);
    const result = complex.csc();
    expect(result.re).toBeCloseTo(1.0);
    expect(result.im).toBeCloseTo(0.0);
  });
});