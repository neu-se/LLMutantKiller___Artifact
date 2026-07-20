import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly divide complex numbers where |c| > |d|", () => {
    // When |c| > |d|, the code takes the else branch where x = d / c (original)
    // The mutation changes this to x = d * c
    // We need a case where |re(divisor)| > |im(divisor)|
    // divisor: c + di where |c| > |d|
    // e.g., divide (3 + 4i) / (2 + 1i)
    // With c=2, d=1: |c|=2 > |d|=1, so we use the else branch
    // Original: x = d/c = 1/2 = 0.5, t = d*x + c = 1*0.5 + 2 = 2.5
    //   re = (a + b*x) / t = (3 + 4*0.5) / 2.5 = 5/2.5 = 2
    //   im = (b - a*x) / t = (4 - 3*0.5) / 2.5 = 2.5/2.5 = 1
    // Mutated: x = d*c = 1*2 = 2, t = d*x + c = 1*2 + 2 = 4
    //   re = (a + b*x) / t = (3 + 4*2) / 4 = 11/4 = 2.75
    //   im = (b - a*x) / t = (4 - 3*2) / 4 = -2/4 = -0.5
    const result = new Complex(3, 4).div(new Complex(2, 1));
    
    expect(result.re).toBeCloseTo(2, 10);
    expect(result.im).toBeCloseTo(1, 10);
  });
});