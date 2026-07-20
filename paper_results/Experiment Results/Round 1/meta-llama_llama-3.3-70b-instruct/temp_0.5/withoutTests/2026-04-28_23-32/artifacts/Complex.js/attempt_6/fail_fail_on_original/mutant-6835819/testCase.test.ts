import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(0.9, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(1.4722194895836544, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});