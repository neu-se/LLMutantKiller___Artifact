import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division with complex divisor where |c| > |d|", () => {
  it("should correctly divide complex numbers when the real part of divisor is larger than imaginary part", () => {
    // We need a case where Math.abs(c) > Math.abs(d), triggering the else branch
    // where x = d / c (original) vs x = d * c (mutated)
    // 
    // Let's use: (4 + 2i) / (3 + 1i)
    // Here c = 3, d = 1, so |c| > |d|, triggering the else branch
    // 
    // Manual calculation: (4 + 2i) / (3 + 1i)
    // = (4 + 2i)(3 - 1i) / ((3 + 1i)(3 - 1i))
    // = (12 - 4i + 6i - 2i^2) / (9 + 1)
    // = (12 + 2i + 2) / 10
    // = (14 + 2i) / 10
    // = 1.4 + 0.2i
    
    const result = new Complex(4, 2).div(new Complex(3, 1));
    
    expect(result.re).toBeCloseTo(1.4, 10);
    expect(result.im).toBeCloseTo(0.2, 10);
  });
});