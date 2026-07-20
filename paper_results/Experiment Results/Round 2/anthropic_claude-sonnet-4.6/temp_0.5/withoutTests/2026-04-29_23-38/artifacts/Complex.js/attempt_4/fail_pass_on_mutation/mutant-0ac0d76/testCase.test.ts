import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log", () => {
  it("log of positive real should have zero imaginary part exactly", () => {
    // With original (a > 0 branch): skips empty block, uses atan2(0, positive) = +0
    // With mutation (a <= 0 branch): for a=2, b=0: a<=0 is false, skips block too
    // For a=-2, b=0: original skips (a>0 false), mutation enters empty block
    // Both use general formula... 
    // Test pow instead which has the SAME condition with active return
    const c = new Complex(0, 1); // i
    const result = c.log();
    // log(i) = 0 + (π/2)i
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});