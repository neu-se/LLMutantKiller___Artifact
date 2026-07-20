import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle atanh correctly for a = -1', () => {
    const complex = new Complex(-1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(-Infinity, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });

  it('should handle atanh correctly for a = 0.5', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});