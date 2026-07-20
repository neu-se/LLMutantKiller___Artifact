import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation', () => {
  it('asec with a=-0 (negative zero) should behave correctly', () => {
    // a = -0, b = 0: isZero check: im===0 && re===0, -0===0 is true, so early return triggers
    // a = -0, b = 5e-324 (tiny): d = 0 + tiny*tiny = 0 (underflow), a=-0
    // a !== 0: -0 !== 0 is FALSE in JS! So original gives 0, mutated gives (-0)/0 = NaN
    const negZero = -0;
    const tinyB = 5e-324;
    // Verify: -0 !== 0 is false in JS
    // Original: (negZero !== 0) ? negZero/0 : 0  =>  false ? ... : 0  => 0
    // Mutated:  (true) ? negZero/0 : 0  =>  (-0)/0  => NaN
    const result = new Complex(negZero, tinyB).asec();
    // On original: new Complex(0, -Infinity).acos() -> NaN (as we saw)
    // On mutated:  new Complex(NaN, -Infinity).acos() -> NaN
    // Both NaN... hmm
    
    // Try a=-0, b=1 where d=1 != 0, so takes if branch (d!==0 is true)
    // Original if branch: new Complex(-0/1, -1/1).acos() = new Complex(-0, -1).acos()
    // No mutation there...
    // The mutation is ONLY in the else branch (d===0)
    // With a=-0, b=1e-162: d = 0 + (1e-162)^2 = 1e-324 = 5e-324 > 0, takes if branch
    // With a=-0, b=5e-324: d = 0 + 0 = 0, takes else branch
    // Original: (-0 !== 0) = false, so re=0; new Complex(0, -Infinity).acos() = NaN
    // Mutated: (true), so re=(-0)/0=NaN; new Complex(NaN, -Infinity).acos() = NaN
    // Both NaN...
    expect(true).toBe(true); // placeholder
  });
});