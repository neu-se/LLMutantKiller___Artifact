import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex atan', () => {
  it('should compute atan(1 + 2i) correctly with finite result', () => {
    const c = new Complex(1, 2);
    const result = c.atan();
    // atan(1+2i) = (i/2)*log((i+1+2i)/(i-1-2i)) = (i/2)*log((1+3i)/(-1-i))
    // Expected: re ≈ 1.3389725222944935, im ≈ 0.40235947810852507
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    expect(result.re).toBeCloseTo(1.3389725222944935, 5);
    expect(result.im).toBeCloseTo(0.40235947810852507, 5);
  });
});