import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot with one large component", () => {
  it("abs() is correct when only real part is large", () => {
    // hypot(5000, 1): a=5000, b=1, a>=b, only a>=3000
    // Original (a=b=1, b=x/y=5000): return 1*sqrt(1+25000000) ≈ 5000.0001
    // Mutated (b=x*y=5000, b=x/y=5000): a stays 5000, return 5000*sqrt(25000001) ≈ huge
    // Correct: sqrt(5000^2 + 1) ≈ 5000.0001
    const c = new Complex(5000, 1);
    const correct = Math.sqrt(5000 * 5000 + 1);
    expect(c.abs()).toBeCloseTo(correct, 3);
  });
});