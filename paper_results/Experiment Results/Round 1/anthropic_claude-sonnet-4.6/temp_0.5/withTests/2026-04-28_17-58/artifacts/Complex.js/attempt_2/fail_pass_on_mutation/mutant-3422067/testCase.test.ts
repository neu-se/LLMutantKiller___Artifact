import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot boundary behavior", () => {
  it("correctly computes abs for complex number with equal large components", () => {
    // x = 3000, y = 3000: a = b = 3000
    // First condition: 3000 < 3000 is FALSE, so we go to second if
    // Original (a < b): 3000 < 3000 = false -> else: b = y/x = 1, a stays 3000
    // Mutated (a <= b): 3000 <= 3000 = true -> if: a = 3000, b = x/y = 1
    // Both give 3000 * sqrt(2) - same result
    
    // Need a case where the mutation produces different intermediate computation
    // that leads to different floating point result
    
    // What if we use non-integer values?
    const val = 3000.0000000001;
    const c = new Complex(val, val);
    const expected = val * Math.sqrt(2);
    expect(c.abs()).toBeCloseTo(expected, 5);
  });
});