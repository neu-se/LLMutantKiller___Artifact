import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asec correctly', () => {
    const c = new Complex(2, 3);
    const result = c.asec();
    const expected = new Complex(
      c.re / (c.abs() * c.abs()),
      -c.im / (c.abs() * c.abs())
    ).acos();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});