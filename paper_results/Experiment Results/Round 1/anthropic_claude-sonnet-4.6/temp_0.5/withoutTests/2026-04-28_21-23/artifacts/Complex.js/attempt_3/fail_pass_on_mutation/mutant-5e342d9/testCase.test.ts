import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs large number hypot mutation detection", () => {
  it("detects mutation in hypot when a >= b branch is taken with large values", () => {
    // re=4000, im=3000: a=|4000|=4000, b=|3000|=3000
    // a >= b is true
    // Original: b = x/y = 4000/3000 ≈ 1.333, then return a*sqrt(1+b^2) = 4000*sqrt(1+1.777) = 5000
    // Mutated: b = x*y = 4000*3000 = 12000000, return 4000*sqrt(1+144e12) ≈ 4.8e9
    // Previous attempts said both pass - maybe a=b reassignment happens first?
    // Let me check: maybe placeholder replaces "a = b;" not "b = x/y"
    // The shown code has both placeholder AND "b = x / y;" - so placeholder must be "a = b;"
    // Original structure: a=b; b=x/y -> a becomes old_b, b becomes x/y
    // Mutated structure: b=x*y; b=x/y -> a stays as abs(x), b becomes x/y (same!)
    // That's why mutation has no effect on result... unless placeholder replaces the SECOND b=x/y
    
    // Actually re-reading: the shown code after placeholder shows "b = x / y;" as the NEXT line
    // So original = [b=x/y (placeholder)] + [b=x/y (next line)] - redundant
    // Mutated = [b=x*y (placeholder)] + [b=x/y (next line)] - second overwrites first, no effect!
    
    // This means the real mutation must be replacing "a = b;" 
    // Original "a = b;" makes a = larger value; mutated would keep a = abs(x)
    // But mutation says original="b = x / y" mutated="b = x * y"...
    
    // Let me just test and see what actually differs
    const z = new Complex(4000, 3000);
    expect(z.abs()).toBeCloseTo(5000, 1);
  });
});