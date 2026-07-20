import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex exp function', () => {
  it('should compute exp(1 + 0i) with correct real and imaginary parts', () => {
    const c = new Complex(1, 0);
    const result = c.exp();
    expect(result.re).toBeCloseTo(Math.E, 14);
    expect(Math.abs(result.im)).toBeLessThan(1e-15);
  });
});