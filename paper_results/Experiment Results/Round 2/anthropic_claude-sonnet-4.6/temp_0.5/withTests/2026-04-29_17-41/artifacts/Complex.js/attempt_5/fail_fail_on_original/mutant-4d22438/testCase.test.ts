import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot branch detection", () => {
  it("correctly computes abs when re is small positive and im is large", () => {
    // abs calls hypot(re, im) = hypot(3000, 9000)
    // a=3000, b=9000 => a < b, enters branch
    // a becomes 9000, b = im/re = 9000/3000 = 3 (original) vs 9000*3000=27000000 (mutated)
    // original: 9000 * sqrt(1+9) = 9000*sqrt(10) ≈ 28460.5
    // mutated: 9000 * sqrt(1+729000000000000) ≈ 2.7e8
    const c = new Complex(3000, 9000);
    const result = c.abs();
    expect(result).toBeCloseTo(9000 * Math.sqrt(10), 0);
  });
});