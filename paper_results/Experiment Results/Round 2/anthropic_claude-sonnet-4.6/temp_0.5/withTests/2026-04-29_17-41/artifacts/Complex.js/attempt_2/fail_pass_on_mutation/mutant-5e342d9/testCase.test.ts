import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot large values mutation", () => {
  it("computes abs correctly for large complex number triggering division path", () => {
    // Use values where a > b, both >= 3000
    // a=6000, b=3000: ratio b/a = 0.5, result = a*sqrt(1+0.25) = 6000*sqrt(1.25)
    // Original: b = x/y where x=a=6000, y=b=3000 => ratio=2, result=6000*sqrt(5) ≈ 13416.4
    // Mutated: b = x*y = 6000*3000 = 18000000, result = 6000*sqrt(1+18000000^2) -- huge
    const c = new Complex(6000, 3000);
    const expected = Math.sqrt(6000 * 6000 + 3000 * 3000);
    expect(c.abs()).toBeCloseTo(expected, 3);
  });
});