import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle atanh correctly for b = 0 and b != 0', () => {
    const complex1 = new Complex(1, 0);
    const complex2 = new Complex(1, 1);
    expect(complex1.atanh().toString()).not.toBe(complex2.atanh().toString());
  });
});