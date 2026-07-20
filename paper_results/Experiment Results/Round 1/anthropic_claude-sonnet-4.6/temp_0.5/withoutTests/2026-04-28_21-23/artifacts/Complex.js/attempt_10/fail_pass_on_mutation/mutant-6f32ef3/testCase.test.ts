import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex cot', () => {
  it('should correctly compute cotangent of a complex number', () => {
    const c = new Complex(1, 1);
    const result = c.cot();
    expect(result.re).toBeCloseTo(0.2176215618544027, 10);
    expect(result.im).toBeCloseTo(-0.8680141428959249, 10);
  });
});