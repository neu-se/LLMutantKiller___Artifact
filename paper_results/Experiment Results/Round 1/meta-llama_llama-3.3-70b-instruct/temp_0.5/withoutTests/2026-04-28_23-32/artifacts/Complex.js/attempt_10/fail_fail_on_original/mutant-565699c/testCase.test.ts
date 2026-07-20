import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly for small x', () => {
    const x = 0.0001;
    const c = new Complex(x);
    const result = c.cos().sub(1).re;
    const expected = -0.0000050000041666667;
    expect(result).toBeCloseTo(expected, 10);
  });
});