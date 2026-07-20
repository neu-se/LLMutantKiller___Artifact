import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.csc();
    expect(result.re).toBeCloseTo(-0.03037975010986117);
    expect(result.im).toBeCloseTo(-0.03037975010986117);
  });
});