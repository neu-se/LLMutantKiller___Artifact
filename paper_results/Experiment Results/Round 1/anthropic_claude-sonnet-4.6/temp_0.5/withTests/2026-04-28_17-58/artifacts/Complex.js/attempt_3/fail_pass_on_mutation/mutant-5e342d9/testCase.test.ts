import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs large value hypot", () => {
  it("computes correct abs for large complex number with re > im, both >= 3000", () => {
    // hypot(x=6000, y=3000): a=6000, b=3000, a>=b
    // Original placeholder: b = x/y = 2, then b = x/y = 2 again
    // result = 6000 * sqrt(1 + 4) = 6000 * sqrt(5) ≈ 13416.407...
    // Expected: sqrt(6000^2 + 3000^2) = sqrt(36000000 + 9000000) = sqrt(45000000) ≈ 6708.2...
    // These don't match... so the algorithm must be different
    // Let me reconsider: after a>=b branch, a is still Math.abs(x)=6000
    // return a * sqrt(1 + b*b) where b=x/y=2 => 6000*sqrt(5) != sqrt(45M)
    // This means the placeholder must set a=b (the smaller), not b=x/y
    // Original must be: a = b; (reassign a to smaller value)
    // Then b = x/y (ratio of original a/b)
    // return b_new(=original_b=3000) * sqrt(1 + (x/y)^2) ... still wrong
    
    // Actually: a=b sets a=Math.abs(y)=3000, b=x/y=6000/3000=2
    // return 3000 * sqrt(1+4) = 3000*sqrt(5) ≈ 6708.2 ✓
    const c = new Complex(6000, 3000);
    const expected = Math.sqrt(6000 * 6000 + 3000 * 3000);
    expect(c.abs()).toBeCloseTo(expected, 5);
  });
});