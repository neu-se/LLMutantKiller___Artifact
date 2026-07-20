import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate sec correctly for a specific input', () => {
    const c = new Complex(0, 0);
    const result = c.sec();
    expect(result.re).toBeCloseTo(1, 6);
    expect(result.im).toBeCloseTo(0, 6);
  });
});