import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('asinh mutation detection', () => {
  it('should correctly compute asinh of a real number', () => {
    // asinh(1) = ln(1 + sqrt(2)) ≈ 0.8813735870195430
    const result = new Complex(1, 0).asinh();
    expect(result.re).toBeCloseTo(Math.asinh(1), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});