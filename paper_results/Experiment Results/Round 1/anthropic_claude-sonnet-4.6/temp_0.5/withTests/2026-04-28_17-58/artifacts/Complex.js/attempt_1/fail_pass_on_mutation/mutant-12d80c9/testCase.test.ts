import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asech', () => {
  it('should compute asech correctly for a real number where a !== 0', () => {
    // asech(0.5) = log(1/0.5 + sqrt(1/0.5^2 - 1)) = log(2 + sqrt(3))
    const result = new Complex(0.5, 0).asech();
    const expected = Math.log(2 + Math.sqrt(3));
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});