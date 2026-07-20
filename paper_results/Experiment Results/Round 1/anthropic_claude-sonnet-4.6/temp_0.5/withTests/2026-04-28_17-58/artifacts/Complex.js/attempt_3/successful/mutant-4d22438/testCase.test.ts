import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot mutation detection", () => {
  it("should compute correct abs for large complex number where real > imaginary", () => {
    // x=4000, y=3000: a=4000, b=3000, a >= b so inner if skipped
    // b = y/x = 3000/4000 = 0.75 (original) => 4000*sqrt(1+0.5625) = 4000*1.25 = 5000
    // b = y*x = 3000*4000 = 12000000 (mutated) => hugely wrong
    const c = new Complex(4000, 3000);
    const magnitude = c.abs();
    expect(magnitude).toBeCloseTo(5000, 3);
  });
});