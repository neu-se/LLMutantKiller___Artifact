import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech mutation detection", () => {
  it("should return Infinity re part when a !== 0 in d===0 branch of asech", () => {
    // Create a complex number with re=1, im=0, then override isZero to return false
    // and set re/im to 0 to force the d===0 branch with a=0
    // Actually: create z with re=0, im=0 but bypass isZero check
    const c = new Complex(1, 0);
    // Force d===0 branch by patching isZero and setting values
    c['re'] = 0;
    c['im'] = 0;
    c['isZero'] = () => false; // bypass the early return
    
    // Now a=0, b=0, d=0
    // Original: (a !== 0) ? a/0 : 0 => (0 !== 0) ? ... : 0 => 0
    // Mutated:  (a === 0) ? a/0 : 0 => (0 === 0) ? 0/0 : 0 => NaN
    const result = c.asech();
    expect(isNaN(result.re)).toBe(false);
    expect(result.re).toBe(0);
  });
});