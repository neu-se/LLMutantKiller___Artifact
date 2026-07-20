import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate cos(x) - 1 using Taylor series for small x', () => {
    const x = 0.01;
    const complex = new Complex(x, 0);
    const cosm1Value = complex.cos().sub(1, 0).re;
    const expected = Math.cos(x) - 1;
    expect(Math.sign(cosm1Value)).toBe(Math.sign(expected));
  });
});