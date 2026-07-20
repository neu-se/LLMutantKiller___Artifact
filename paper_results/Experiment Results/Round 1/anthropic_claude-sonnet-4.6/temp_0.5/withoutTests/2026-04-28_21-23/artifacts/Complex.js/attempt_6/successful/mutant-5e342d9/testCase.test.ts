import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mutation detection via pow", () => {
  it("pow uses logHypot not hypot, so test abs directly with exact integer check", () => {
    // Try a Pythagorean triple scaled to exceed 3000
    // 3000, 4000, 5000 - but we need BOTH to exceed 3000
    // Try 3600, 4800, 6000 (3-4-5 scaled by 1200)
    const z = new Complex(3600, 4800);
    expect(z.abs()).toBeCloseTo(6000, 5);
  });
});