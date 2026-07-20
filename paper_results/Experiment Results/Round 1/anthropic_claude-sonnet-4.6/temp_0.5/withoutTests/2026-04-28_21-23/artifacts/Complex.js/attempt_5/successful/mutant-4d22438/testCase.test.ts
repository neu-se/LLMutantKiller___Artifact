import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs mutation detection", () => {
  it("correctly computes abs when re is negative and large", () => {
    // hypot(-4000, 3000): a=4000, b=3000, a>=b, if NOT taken
    // placeholder runs unconditionally
    // original: b = y/x = 3000/(-4000) = -0.75, b*b = 0.5625
    // result = 4000 * sqrt(1.5625) = 4000 * 1.25 = 5000
    // mutated: b = y*x = 3000*(-4000) = -12e6, b*b = 144e12
    // result = 4000 * sqrt(144e12 + 1) >> 5000
    const c = new Complex(-4000, 3000);
    expect(c.abs()).toBeCloseTo(5000, 5);
  });
});