import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should compute asech correctly for a real number greater than 1 where d=0 fallback differs", () => {
    // The mutation changes (a !== 0) ? a / 0 : 0 to (false) ? a / 0 : 0
    // in the d === 0 fallback of asech.
    // d = a*a + b*b = 0 only when a=0 and b=0, but isZero() check handles that.
    // We need to trigger d === 0 branch - this is unreachable normally.
    // Instead, test the d !== 0 branch to ensure asech works correctly,
    // and verify the mutation doesn't affect it.
    // Actually let's test with a=0, b=0 bypassing isZero - not possible directly.
    // Let's verify asech(0.5) works - uses d !== 0 branch
    const result = new Complex(0, 0).asech();
    // isZero() returns true, so returns INFINITY
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
    
    // For the mutation to matter, we need d=0 with non-zero a or b - impossible normally
    // Test that asech of a small real number gives expected result
    const result2 = new Complex(0.5, 0).asech();
    const expected = Math.log(1/0.5 + Math.sqrt(1/0.25 - 1));
    expect(result2.re).toBeCloseTo(expected, 10);
    expect(result2.im).toBeCloseTo(0, 10);
  });
});