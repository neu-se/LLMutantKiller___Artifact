import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow', () => {
  it('should correctly compute (2+3i)^2', () => {
    // (2+3i)^2 = 4 + 12i - 9 = -5 + 12i
    const z = new Complex(2, 3);
    const result = z.pow(new Complex(2, 0));
    expect(result.re).toBeCloseTo(-5, 10);
    expect(result.im).toBeCloseTo(12, 10);
  });
});