import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex exp function', () => {
  it('should correctly compute exp of a real number (im === 0)', () => {
    const c = new Complex(1, 0);
    const result = c.exp();
    expect(result.re).toBeCloseTo(Math.E, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});