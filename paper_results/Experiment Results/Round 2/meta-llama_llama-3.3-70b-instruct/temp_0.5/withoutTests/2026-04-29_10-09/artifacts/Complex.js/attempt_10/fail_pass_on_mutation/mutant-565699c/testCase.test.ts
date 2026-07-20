import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly for a specific value', () => {
    const x = 0.0000000000001;
    const complex = new Complex(x);
    const result = complex.cos().sub(new Complex(1, 0));
    const expected = new Complex(-0.4999999999999999e-18, 0);
    expect(result.equals(expected)).toBe(true);
  });
});