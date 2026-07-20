import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot mutation detection", () => {
  it("abs() is correct for large values where |re| equals |im|, both >= 3000", () => {
    // For equal components: hypot(3000, 3000)
    // a=3000, b=3000, a>=b (equal)
    // If original is a=b (no-op since equal), b=x/y=1: result = 3000*sqrt(2) ≈ 4242.64
    // If original is b=x/y (b=1), b=x/y=1: result = 3000*sqrt(2) ≈ 4242.64
    // Mutated b=x*y=9000000, b=x/y=1: result = 3000*sqrt(2) ≈ 4242.64
    // All same... need different approach
    
    // Try negative values: hypot(-5000, 3000)
    // a=5000, b=3000, a>=b
    // b = x/y = -5000/3000 = -5/3, b*b = 25/9
    // Original: result = 5000*sqrt(1+25/9) = 5000*sqrt(34/9) ≈ 9718
    // But correct: sqrt(25M+9M) = sqrt(34M) ≈ 5831
    // So original must be a=b: a=3000, b=x/y=-5/3
    // result = 3000*sqrt(1+25/9) = 3000*sqrt(34/9) = 3000*sqrt(34)/3 = 1000*sqrt(34) ≈ 5831 ✓
    // Mutated: a stays 5000, b=x/y=-5/3
    // result = 5000*sqrt(34/9) ≈ 9718 ✗
    const c = new Complex(-5000, 3000);
    const expected = Math.sqrt(5000 * 5000 + 3000 * 3000);
    expect(c.abs()).toBeCloseTo(expected, 3);
  });
});