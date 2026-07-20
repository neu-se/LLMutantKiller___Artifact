import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly', () => {
    const x = 0.0001;
    const complex = new Complex(x);
    const result = complex.cosm1();
    const expected = complex.cos().sub(1);
    expect(Math.abs(result.re - expected.re) < 1e-10 && Math.abs(result.im - expected.im) < 1e-10).toBe(true);
  });
});