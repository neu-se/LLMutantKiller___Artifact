import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the correct expm1(x) for small x', () => {
    const x = 0.000001;
    const complex = new Complex(x);
    const result = complex.expm1().re;
    const expected = Math.expm1(x);
    const diff = Math.abs(result - expected);
    expect(diff < 1e-10).toBe(true);
    expect(diff!== 0).toBe(true);
  });
});