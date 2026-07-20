import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly for a specific input', () => {
    const x = 0.0001;
    const complex = new Complex(x);
    const cosm1 = complex.cos().sub(1);
    const expected = Math.cos(x) - 1;
    expect(cosm1.re).toBeCloseTo(expected, 15);
    expect(cosm1.im).toBeCloseTo(0, 15);
  });
});