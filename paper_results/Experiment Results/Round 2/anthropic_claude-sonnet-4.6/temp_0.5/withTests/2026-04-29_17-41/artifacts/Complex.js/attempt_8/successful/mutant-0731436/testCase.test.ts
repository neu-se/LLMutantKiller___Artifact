import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe("Complex asec", () => {
  it("detects mutation: asec with object im coercing to 0 should not give pi/2", () => {
    const zeroObj = { valueOf: () => 0 };
    const c = new Complex({ re: 0, im: zeroObj });
    const result = c.asec();
    // Original: d=0, b!==0 → NaN result (not π/2)
    // Mutated:  d=0, false → acos(0,0) = (π/2, 0)
    expect(result.re).not.toBeCloseTo(Math.PI / 2, 5);
  });
});