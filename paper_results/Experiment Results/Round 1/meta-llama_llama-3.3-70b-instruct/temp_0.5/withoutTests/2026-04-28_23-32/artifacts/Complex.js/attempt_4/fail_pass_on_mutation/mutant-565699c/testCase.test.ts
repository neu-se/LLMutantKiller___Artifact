import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly', () => {
    const x = 0.00001;
    const c = new Complex(x);
    const result = c.expm1();
    const expected = Math.expm1(x);
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});