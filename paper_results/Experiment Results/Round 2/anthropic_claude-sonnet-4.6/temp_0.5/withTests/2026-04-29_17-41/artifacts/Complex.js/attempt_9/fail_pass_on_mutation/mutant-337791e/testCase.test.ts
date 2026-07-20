import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex exp with imaginary component', () => {
  it('should correctly compute exp(0 + pi*i) = -1', () => {
    const result = new Complex(0, Math.PI).exp();
    expect(result.re).toBeCloseTo(-1, 10);
    expect(Math.abs(result.im)).toBeLessThan(1e-10);
  });
});