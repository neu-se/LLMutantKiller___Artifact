import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow mutation detection', () => {
  it('should correctly compute pow for non-zero base', () => {
    const result = new Complex(2, 0).pow(new Complex(3, 0));
    expect(result.re).toBeCloseTo(8, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});