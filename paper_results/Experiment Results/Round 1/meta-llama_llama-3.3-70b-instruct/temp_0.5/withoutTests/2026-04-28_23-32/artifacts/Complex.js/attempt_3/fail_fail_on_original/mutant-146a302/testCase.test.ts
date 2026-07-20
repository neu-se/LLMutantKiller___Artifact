import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate sec correctly', () => {
    const c = new Complex(1, 0);
    const result = c.sec();
    expect(result.re).toBeCloseTo(1.0, 6);
    expect(result.im).toBeCloseTo(0.0, 6);
  });
});