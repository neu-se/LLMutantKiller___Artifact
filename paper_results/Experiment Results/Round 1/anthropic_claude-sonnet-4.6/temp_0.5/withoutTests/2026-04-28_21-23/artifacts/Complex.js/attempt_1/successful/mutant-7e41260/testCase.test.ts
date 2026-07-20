import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide complex numbers when |c| > |d|", () => {
    // We need a case where Math.abs(c) > Math.abs(d), which takes the else branch
    // In the else branch: x = d / c (original) vs x = d * c (mutated)
    // Let's use z1 = (3 + 4i) / (4 + 1i)
    // Here c = 4, d = 1, so |c| > |d|, taking the else branch
    // x = d / c = 1 / 4 = 0.25 (original)
    // x = d * c = 1 * 4 = 4 (mutated)
    
    const z1 = new Complex(3, 4);
    const z2 = new Complex(4, 1);
    const result = z1.div(z2);
    
    // Expected: (3 + 4i) / (4 + 1i)
    // Multiply numerator and denominator by conjugate (4 - i):
    // (3 + 4i)(4 - i) / (4 + i)(4 - i)
    // = (12 - 3i + 16i - 4i^2) / (16 + 1)
    // = (12 + 13i + 4) / 17
    // = (16 + 13i) / 17
    // = 16/17 + 13/17 * i
    const expectedRe = 16 / 17;
    const expectedIm = 13 / 17;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});