import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate cos(x) - 1 using Taylor series for small x', () => {
    const x = 0.000001;
    const complex = new Complex(x, 0);
    const cosm1Value = complex.cos().sub(Complex.ONE).re;
    const expected = Math.cos(x) - 1;
    expect(Math.abs(cosm1Value - expected) < 1e-12 && Math.sign(cosm1Value) === Math.sign(expected)).toBe(true);
  });
});