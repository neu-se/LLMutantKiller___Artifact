import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("should return zero when 0+0i is raised to a power with positive real and zero imaginary part", () => {
    // Original: condition z.im >= 0 is true when z.im === 0, returns Complex.ZERO immediately
    // Mutated: condition z.im > 0 is false when z.im === 0, falls through to the outer
    // return Complex['ZERO'] - but wait, we need to find a case where behavior differs.
    // When z.im === 0 and z.re > 0 and a === 0 and b === 0:
    // Original enters the if and returns Complex.ZERO
    // Mutated skips the if, hits return Complex['ZERO'] anyway
    // So let's try z.im slightly above 0 to see if there's a difference in the imaginary part handling
    
    // Actually the mutation matters when z['im'] === 0 exactly.
    // In original, returns Complex.ZERO (re=0, im=0)
    // In mutated, skips to return Complex.ZERO at end of block - same result?
    // Need to check if there's another path. Let me try z.re > 0, z.im = 0, a=0, b=0
    // and verify the im part is exactly 0 not -0
    const base = new Complex(0, 0);
    const result = base.pow(new Complex(3, 0));
    
    expect(Object.is(result.re, 0)).toBe(true);
    expect(Object.is(result.im, 0)).toBe(true);
  });
});