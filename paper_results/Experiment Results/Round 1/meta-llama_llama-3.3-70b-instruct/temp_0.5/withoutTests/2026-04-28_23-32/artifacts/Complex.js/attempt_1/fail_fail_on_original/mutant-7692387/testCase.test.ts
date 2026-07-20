import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate asinh', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(result.re).toBeCloseTo(1.2378675773239744, 10);
    expect(result.im).toBeCloseTo(0.8018795096246727, 10);
  });
});