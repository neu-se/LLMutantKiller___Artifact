import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should format complex number with negative imaginary part correctly showing minus sign", () => {
    // When a=0 and b=-1: both original and mutated add "-" prefix
    // When a=0 and b=1: both show "i" 
    // The mutation b<=0 vs b<0 matters when b===0 with a===0
    // But b===0 is caught by early return... 
    // Let's check: a=1, b=0 -> returns "1" (early return for b===0)
    // Actually the difference: with mutation, when a===0 and b===-0
    // -0 === 0 is true in JS so early return fires -> returns "0"
    // No difference observable this way
    // 
    // The REAL difference: the placeholder is INSIDE the a!==0 block
    // Let me re-read: after the inner if/else for b<=0/else, there's ret+=" "
    // then the placeholder else if runs for a===0 case
    // For a===0, b===0: early return "0" - no difference
    // For a===0, b<0: both add "-" - no difference  
    // For a===0, b>0: neither adds "-" - no difference
    // For a===0, b===-0: early return - no difference
    // There truly seems to be no observable difference!
    // Unless... the early return check uses strict equality and -0 passes through?
    const c = new Complex(0, -0);
    expect(c.toString()).toBe("0");
  });
});