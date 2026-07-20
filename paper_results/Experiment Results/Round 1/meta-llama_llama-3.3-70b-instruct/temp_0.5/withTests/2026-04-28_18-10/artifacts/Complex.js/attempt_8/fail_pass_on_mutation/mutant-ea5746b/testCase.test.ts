import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate cos(x) - 1 using Taylor series for small x', () => {
    const x = 1e-8;
    const complex = new Complex(x, 0);
    const cosm1Value = complex.cos().sub(Complex.ONE).re;
    const expected = Math.cos(x) - 1;
    expect(Math.abs(cosm1Value - expected)).toBeLessThan(1e-12);
    expect(cosm1Value).toBeCloseTo(expected, 12);
  });
});