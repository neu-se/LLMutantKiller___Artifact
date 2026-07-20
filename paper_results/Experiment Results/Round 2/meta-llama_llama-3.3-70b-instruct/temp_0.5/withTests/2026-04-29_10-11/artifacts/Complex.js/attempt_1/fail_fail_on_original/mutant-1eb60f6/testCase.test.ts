import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct acsc value for a complex number', () => {
    const complex = new Complex(0, 0);
    const acsc = complex.acsc();
    expect(acsc.re).toBeCloseTo(Math.PI / 2);
    expect(acsc.im).toBeCloseTo(Infinity);
  });
});