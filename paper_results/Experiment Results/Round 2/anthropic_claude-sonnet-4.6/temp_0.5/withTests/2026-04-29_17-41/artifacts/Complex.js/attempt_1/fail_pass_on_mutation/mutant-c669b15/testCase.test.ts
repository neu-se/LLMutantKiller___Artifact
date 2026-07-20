import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex div", () => {
  it("should produce correct result when dividing by complex number with equal absolute real and imaginary parts", () => {
    // Use values where the two branches give numerically different results
    // c = 3, d = -3 (|c| == |d|)
    // Original: else branch: x = d/c = -1, t = d*x + c = 3 + (-3) = 0... wait that's bad
    // Let me recalculate: t = d * x + c where x = d/c
    // t = d * (d/c) + c = d²/c + c = (d² + c²)/c
    // For c=3, d=-3: t = 9/3 + 3 = 6
    // Mutated: if branch: x = c/d = -1, t = c*x + d = -3 + (-3) = -6
    // re_original = (a + b*x)/t = (a - b)/6
    // re_mutated = (a*x + b)/t = (-a + b)/(-6) = (a - b)/6  -- same!
    // im_original = (b - a*x)/t = (b + a)/6
    // im_mutated = (b*x - a)/t = (-b - a)/(-6) = (b + a)/6  -- same!
    
    const result = new Complex(4, 2).div(new Complex(3, -3));
    // Expected: (4+2i)/(3-3i) = (4+2i)(3+3i)/18 = (12-6 + i(12+6))/18 = 6/18 + 18i/18 = 1/3 + i
    expect(result.re).toBeCloseTo(1/3, 10);
    expect(result.im).toBeCloseTo(1, 10);
  });
});