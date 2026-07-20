import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('atanh mutation detection', () => {
  it('should correctly compute atanh for real values greater than 1', () => {
    const result = new Complex(2, 0).atanh();
    // atanh(2) = ln(3)/2 - πi/2
    expect(result.re).toBeCloseTo(Math.log(3) / 2, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
    expect(isNaN(result.im)).toBe(false);
  });
});