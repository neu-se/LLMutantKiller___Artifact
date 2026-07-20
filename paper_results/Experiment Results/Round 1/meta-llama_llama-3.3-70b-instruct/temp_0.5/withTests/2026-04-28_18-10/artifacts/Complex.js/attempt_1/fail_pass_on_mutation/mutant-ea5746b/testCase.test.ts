import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate cos(x) - 1 using Taylor series', () => {
    const x = 0.1;
    const expected = Math.cos(x) - 1;
    const complex = new Complex(x, 0);
    const cosm1 = complex.cos().sub(1, 0);
    expect(Math.abs(cosm1.re - expected) < 1e-9).toBe(true);
  });
});