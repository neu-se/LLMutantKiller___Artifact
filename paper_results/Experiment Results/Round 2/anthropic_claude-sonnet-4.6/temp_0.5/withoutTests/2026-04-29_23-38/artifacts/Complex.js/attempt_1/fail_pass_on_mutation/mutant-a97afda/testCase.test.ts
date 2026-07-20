import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex atan', () => {
  it('should correctly compute atan of a real number', () => {
    const c = new Complex(1, 0);
    const result = c.atan();
    expect(result.re).toBeCloseTo(Math.PI / 4, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});