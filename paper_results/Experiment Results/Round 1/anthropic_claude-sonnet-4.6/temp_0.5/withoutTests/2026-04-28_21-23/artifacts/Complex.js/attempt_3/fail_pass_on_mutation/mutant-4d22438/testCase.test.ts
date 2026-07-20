import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot large number branch via abs()", () => {
  it("detects mutation in hypot when abs(x) < abs(y) and values >= 3000", () => {
    // x=3000, y=4000: a=3000 < b=4000, so branch taken
    // original: b = y/x = 4/3, result = 4000*sqrt(1+16/9) = 4000*(5/3) = 5000
    // mutated: b = y*x = 12000000, result = 4000*sqrt(1+144e12) ≈ 4.8e10
    const c = new Complex(3000, 4000);
    expect(c.abs()).toBeCloseTo(5000, 1);
  });
});