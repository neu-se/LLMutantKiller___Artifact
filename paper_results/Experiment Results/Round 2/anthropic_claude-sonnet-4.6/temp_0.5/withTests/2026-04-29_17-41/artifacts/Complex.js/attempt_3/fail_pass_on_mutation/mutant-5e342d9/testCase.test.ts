import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot mutation detection", () => {
  it("abs of large complex where im > re uses else branch correctly", () => {
    // When a < b (|im| > |re|), else branch: b = y/x
    // This is unaffected by mutation
    // When a >= b, the if branch is used - test this
    // 
    // Key insight: maybe the placeholder sets `a = b` (reassign a to old b value)
    // so that after: a = old_b, then b = x/y = old_a/old_b
    // result = old_b * sqrt(1 + (old_a/old_b)^2) = sqrt(old_b^2 + old_a^2) ✓
    //
    // Mutated: a = b * b (or a = b * something)
    // Let me just try with a number that would produce Infinity or NaN with multiplication
    
    // If mutated placeholder is `b = x * y` where x=a=5000, y=b=3000:
    // b = 15000000, then b = x/y = 5000/3000 (OVERWRITTEN)
    // So mutation has no effect if b is overwritten!
    //
    // UNLESS the structure is different and there's only ONE assignment in each branch
    // and the shown `b = x / y` is the ELSE branch line shown at same indentation
    
    // Let me test: if structure is actually:
    // if (a >= b) { PLACEHOLDER } else { b = x / y; }  -- NO, else has b = y/x
    
    // I'll test with a value that makes the difference observable
    // assuming placeholder is the ONLY line in if-branch:
    // Original if-branch: b = x/y (where x,y are original params, a=|x|, b=|y|)
    // For x=5000, y=3000: b = 5000/3000 = 5/3
    // result = 5000 * sqrt(1 + 25/9) = 5000 * sqrt(34/9) = 5000/3 * sqrt(34) ≈ 9718
    // actual = sqrt(34000000) ≈ 5831
    // These don't match, so original would also be wrong...
    
    // I think the correct reading is:
    // if (a >= b) { a = b; b = x / y; } -- placeholder is `a = b`
    // Mutated: a = b * (something)
    
    // With a=b: a=3000, b=5000/3000=5/3, result=3000*sqrt(1+25/9)=3000*sqrt(34/9)=1000*sqrt(34)≈5831 ✓
    
    const c = new Complex(5000, 3000);
    const expected = Math.sqrt(5000 * 5000 + 3000 * 3000);
    expect(c.abs()).toBeCloseTo(expected, 5);
  });
});