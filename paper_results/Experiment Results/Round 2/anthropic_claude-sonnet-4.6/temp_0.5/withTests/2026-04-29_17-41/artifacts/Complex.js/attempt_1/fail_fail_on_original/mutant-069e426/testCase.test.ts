import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation test', () => {
  it('should compute asec correctly for a real number where a !== 0', () => {
    // asec(2) = acos(1/2) = π/3
    const result = new Complex(2, 0).asec();
    const expected = Math.PI / 3;
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);

    // Test with a = 0, b != 0 to trigger the d !== 0 branch
    // asec(i) should give a specific value
    const result2 = new Complex(0, 1).asec();
    // 1/i = -i, acos(-i)
    const expected2 = new Complex(-1, 0).div(new Complex(0, 1)).acos();
    expect(result2.re).toBeCloseTo(expected2.re, 10);
    expect(result2.im).toBeCloseTo(expected2.im, 10);

    // The key test: when d = 0 branch is hit with a !== 0
    // This requires a*a + b*b = 0 with a != 0, which is impossible in reals
    // So test the normal path to ensure asec works correctly
    const result3 = new Complex(0, 0).asec();
    expect(result3.re).toBe(0);
    expect(result3.im).toBe(Infinity);
  });
});