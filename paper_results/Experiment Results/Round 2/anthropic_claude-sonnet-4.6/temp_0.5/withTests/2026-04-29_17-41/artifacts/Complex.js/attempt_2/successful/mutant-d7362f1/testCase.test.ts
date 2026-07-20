import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mul", () => {
  it("should return positive zero imaginary part when multiplying two negative real numbers", () => {
    const a = new Complex(-5, 0);
    const b = new Complex(-3, 0);
    
    const result = a.mul(b);
    
    // Original code takes the optimization branch and returns im = 0 (positive zero)
    // Mutated code skips the branch and computes: im = (-5)*0 + 0*(-3) = -0
    expect(Object.is(result.im, 0)).toBe(true);
  });
});