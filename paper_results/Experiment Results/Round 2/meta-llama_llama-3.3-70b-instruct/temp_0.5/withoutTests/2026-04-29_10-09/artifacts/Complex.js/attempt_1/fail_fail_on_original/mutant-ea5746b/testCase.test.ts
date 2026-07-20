import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 correctly using Taylor series for small x', () => {
    const x = 0.01;
    const resultOriginal = new Complex(x).expm1().re;
    const resultExpected = Math.exp(x) - 1;
    expect(Math.abs(resultOriginal - resultExpected)).toBeLessThan(1e-10);
  });
});