import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("detects mutation in acsch d===0 branch", () => {
    // Use 1e-200: (1e-200)^2 = 1e-400 which underflows to 0
    // but 1e-200 !== 0, so early return is not triggered
    const tiny = 1e-200;
    const z = new Complex(0, tiny);
    const result = z.acsch();
    // Original: d=0, b!=0 → new Complex(0, -Infinity).asinh() → NaN
    // Mutated: d=0, b===0 is false → new Complex(0, 0).asinh() → (0,0), not NaN
    expect(result.isNaN()).toBe(true);
  });
});