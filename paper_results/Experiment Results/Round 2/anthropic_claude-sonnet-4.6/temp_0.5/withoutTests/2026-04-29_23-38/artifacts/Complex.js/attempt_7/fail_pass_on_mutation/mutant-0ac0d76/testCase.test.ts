import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("2 raised to power 53 should be exact integer with positive real base shortcut", () => {
    // Original: a=2>0, b=0 -> uses Math.pow(2,53) = 9007199254740992 exactly
    // Mutated: a=2, a<=0 is false, falls to exp/log formula which may lose precision
    const base = new Complex(2, 0);
    const result = base.pow(53);
    
    expect(result.re).toBe(Math.pow(2, 53));
    expect(result.im).toBe(0);
  });
});