import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide complex numbers when |c| > |d|", () => {
    // When |c| > |d|, the code takes the else branch where x = d / c (original)
    // The mutation changes this to x = d * c
    // We need a case where Math.abs(c) > Math.abs(d)
    // Let's use (3 + 4i) / (5 + 2i)
    // c = 5, d = 2, |c| > |d|, so we go into the else branch
    // Original: x = d/c = 2/5 = 0.4, t = d*x + c = 2*0.4 + 5 = 5.8
    //   re = (a + b*x) / t = (3 + 4*0.4) / 5.8 = (3 + 1.6) / 5.8 = 4.6/5.8
    //   im = (b - a*x) / t = (4 - 3*0.4) / 5.8 = (4 - 1.2) / 5.8 = 2.8/5.8
    // Mutated: x = d*c = 2*5 = 10, t = d*x + c = 2*10 + 5 = 25
    //   re = (a + b*x) / t = (3 + 4*10) / 25 = 43/25 = 1.72
    //   im = (b - a*x) / t = (4 - 3*10) / 25 = -26/25 = -1.04
    
    const result = new Complex(3, 4).div(new Complex(5, 2));
    
    // Expected: (3+4i)/(5+2i) = (3+4i)(5-2i)/((5+2i)(5-2i))
    // = (15 - 6i + 20i - 8i^2) / (25 + 4)
    // = (15 + 14i + 8) / 29
    // = (23 + 14i) / 29
    // = 23/29 + 14/29 * i
    const expectedRe = 23 / 29;
    const expectedIm = 14 / 29;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});