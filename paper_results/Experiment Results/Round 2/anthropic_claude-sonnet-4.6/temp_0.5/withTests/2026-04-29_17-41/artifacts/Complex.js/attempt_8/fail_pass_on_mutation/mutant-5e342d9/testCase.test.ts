import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot boundary", () => {
  it("abs at exact boundary value 3000", () => {
    // hypot(3000, 3000): a=3000, b=3000
    // a < 3000 is FALSE, so large path taken
    // a >= b is TRUE (equal)
    // If placeholder is ONLY line (b=x/y original, b=x*y mutated):
    // Original: b=3000/3000=1, result=3000*sqrt(2)
    // Mutated: b=3000*3000=9e6, result=3000*sqrt(1+81e12) -- huge
    // BUT if b=x/y line overwrites, both give b=1, result=3000*sqrt(2)
    // 
    // What if I test with one value < 3000 and one >= 3000?
    // hypot(3000, 2999): a=3000, b=2999
    // a < 3000 is FALSE (3000 is not < 3000)
    // Large path taken! a >= b (3000 >= 2999)
    // Same issue with overwrite
    
    // Let me try: what does abs() return for new Complex(3000, 2999)?
    // Small path: 3000 < 3000 is false -> NOT taken
    // Large path: a=3000 >= b=2999
    // If a=b first: a=2999, b=3000/2999≈1.000333
    // result = 2999*sqrt(1+1.000667) ≈ 2999*1.4144 ≈ 4242.9
    // actual = sqrt(3000^2+2999^2) = sqrt(9000000+8994001) = sqrt(17994001) ≈ 4242.5
    const c = new Complex(3000, 2999);
    const expected = Math.sqrt(3000 * 3000 + 2999 * 2999);
    expect(c.abs()).toBeCloseTo(expected, 5);
  });
});