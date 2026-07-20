import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex csch', () => {
  it('csch of a complex number returns correct result', () => {
    // csch(c) = 1/sinh(c)
    // csch(1) = 1/sinh(1)
    const c = new Complex(1, 0);
    const result = c['csch']();
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(1 / Math.sinh(1), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});