import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly for a specific value', () => {
    const complex = new Complex(0.5, 0);
    const atanh = complex.atanh();
    expect(atanh.re).toBeCloseTo(0.5493061443340548);
    expect(atanh.im).toBeCloseTo(0);
  });
});