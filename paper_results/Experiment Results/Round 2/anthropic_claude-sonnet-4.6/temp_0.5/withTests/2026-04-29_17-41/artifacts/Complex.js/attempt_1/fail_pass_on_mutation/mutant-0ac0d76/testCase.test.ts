import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex log mutation test', () => {
  it('should compute log of a positive real number correctly', () => {
    const result = new Complex(Math.E, 0).log();
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});