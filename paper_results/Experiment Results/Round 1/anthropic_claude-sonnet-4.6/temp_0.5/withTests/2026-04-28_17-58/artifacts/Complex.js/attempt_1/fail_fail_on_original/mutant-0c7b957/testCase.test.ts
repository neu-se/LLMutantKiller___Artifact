import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh for a complex number with non-zero imaginary part", () => {
    // atanh(2 + 2i)
    // With original code: d = oneMinus * oneMinus + b * b = (-1)^2 + 2^2 = 1 + 4 = 5
    // With mutated code:  d = oneMinus * oneMinus + b / b = (-1)^2 + 2/2 = 1 + 1 = 2
    // These produce different results, so the test will fail on mutated code
    
    const result = new Complex(2, 2).atanh();
    
    // The correct value of atanh(2+2i):
    // Using the formula: atanh(z) = log((1+z)/(1-z)) / 2
    // (1+z) = 3+2i, (1-z) = -1-2i
    // (3+2i)/(-1-2i) = (3+2i)*(-1+2i)/((-1)^2+(2)^2) = (-3+6i-2i+4i^2)/5 = (-3-4+4i)/5 = (-7+4i)/5
    // log((-7+4i)/5) = log(-1.4 + 0.8i)
    // |(-1.4+0.8i)| = sqrt(1.96+0.64) = sqrt(2.6)
    // arg(-1.4+0.8i) = atan2(0.8, -1.4)
    // atanh(2+2i) = (log(sqrt(2.6)) + i*atan2(0.8,-1.4)) / 2
    
    const expectedRe = 0.17328679513998635;
    const expectedIm = 1.1780972450961724;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});