import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate the acosh of a complex number', () => {
    const complex = new Complex(1, -1);
    const acosh = complex.acosh();
    expect(acosh.re).toBeCloseTo(0, 10);
    expect(acosh.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});