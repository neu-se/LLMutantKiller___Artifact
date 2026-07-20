import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle atanh correctly for b = 0 and b != 0', () => {
    const complex1 = new Complex(1, 0);
    expect(() => complex1.atanh()).not.toThrow();
    const complex2 = new Complex(1, 1);
    expect(complex2.atanh().re).toBeCloseTo(0.5493061443340548);
    expect(complex2.atanh().im).toBeCloseTo(0.5493061443340548);
  });
});