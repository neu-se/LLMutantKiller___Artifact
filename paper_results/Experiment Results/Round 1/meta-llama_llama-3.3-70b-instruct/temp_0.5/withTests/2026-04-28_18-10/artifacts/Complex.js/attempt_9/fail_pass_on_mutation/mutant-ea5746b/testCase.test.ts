import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate cos(x) - 1 using Taylor series for small x', () => {
    const x = 0.01;
    const complex = new Complex(x, 0);
    const cosm1Value = complex.cos().sub(Complex.ONE).re;
    const expected = Math.cos(x) - 1;
    const diff = Math.abs(cosm1Value - expected);
    expect(diff).toBeLessThan(1e-6);
    const precision = 1e-8;
    expect(cosm1Value).toBeGreaterThan(expected - precision);
    expect(cosm1Value).toBeLessThan(expected + precision);
    expect(Math.sign(cosm1Value)).toBe(Math.sign(expected));
  });
});