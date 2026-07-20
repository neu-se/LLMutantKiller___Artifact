import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation detection', () => {
  it('should correctly compute asec(2) as a real value, not returning Complex(0, Infinity)', () => {
    const result = new Complex(2, 0).asec();
    // asec(2) = acos(1/2) = π/3 ≈ 1.0472
    // The mutated code returns Complex(0, Infinity) for any real non-zero input
    // The original code should return approximately Complex(π/3, 0)
    expect(result.re).toBeCloseTo(Math.PI / 3, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});