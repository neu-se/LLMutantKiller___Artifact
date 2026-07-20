import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec", () => {
  it("should compute asec(2) correctly with real part used in denominator calculation", () => {
    // For asec(2+0i): d = a*a + b*b = 4, then acos(a/d, -b/d) = acos(0.5, 0)
    // With mutation a = undefined: d = NaN, result is NaN
    const c = new Complex(2, 3);
    const result = c.asec();
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    // Verify actual value: asec(2+3i) = acos(1/(2+3i)) = acos((2-3i)/13)
    const inv = new Complex(2/13, -3/13);
    const expected = inv.acos();
    expect(result.re).toBeCloseTo(expected.re, 8);
    expect(result.im).toBeCloseTo(expected.im, 8);
  });
});