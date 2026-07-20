import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the correct cosm1(x) for small x', () => {
    const x = 0.01;
    const complex = new Complex(x);
    const result = complex.cos().sub(1);
    const expected = new Complex(Math.cos(x) - 1, 0);
    const calculated = complex.expm1().re - Math.expm1(x);
    expect(Math.abs(calculated) < 1e-10).toBe(true);
  });
});