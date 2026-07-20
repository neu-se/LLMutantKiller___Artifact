import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate sec correctly for a specific input', () => {
    const c = new Complex(1, 1);
    const result = c.sec();
    const originalResult = new Complex(0.49833703055518686, -0.363970234211915);
    expect(result.re).toBeCloseTo(originalResult.re, 6);
    expect(result.im).toBeCloseTo(originalResult.im, 6);
  });
});