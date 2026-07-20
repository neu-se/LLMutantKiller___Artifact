import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the correct cosm1(x) for small x', () => {
    const x = 0.01;
    const complex = new Complex(x);
    const result = complex.expm1().re;
    const expected = Math.expm1(x);
    const coshResult = complex.cos().sub(1).re;
    expect(Math.abs((result - expected) / coshResult) < 1e-10).toBe(true);
  });
});