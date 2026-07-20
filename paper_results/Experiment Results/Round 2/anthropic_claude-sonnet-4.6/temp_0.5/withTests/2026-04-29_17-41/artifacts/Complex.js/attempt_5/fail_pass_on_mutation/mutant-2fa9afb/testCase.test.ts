import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow', () => {
  it('should correctly compute (2+3i)^(-1) which should not be zero', () => {
    const result = new Complex(2, 3).pow(new Complex(-1, 0));
    // result should be 2/13 - 3i/13
    expect(result.re).toBeCloseTo(2/13, 10);
    expect(result.im).toBeCloseTo(-3/13, 10);
  });
});