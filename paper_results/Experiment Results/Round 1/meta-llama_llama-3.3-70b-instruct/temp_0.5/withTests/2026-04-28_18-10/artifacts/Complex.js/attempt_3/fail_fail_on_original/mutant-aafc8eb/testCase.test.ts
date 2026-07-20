import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly', () => {
    const x = 0.0001;
    const complex = new Complex(x);
    const result = complex.cosm1();
    const expected = complex.expm1().div(new Complex(2)).mul(new Complex(Math.sin(x)));
    expect(Math.abs(result.re - expected.re) < 1e-10 && Math.abs(result.im - expected.im) < 1e-10).toBe(true);
  });
});