import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc function", () => {
  it("should correctly compute the inverse cosecant of a complex number", () => {
    // acsc(c) = -i * log(i / c + sqrt(1 - 1 / c^2))
    // The mutation changes `-b / d` to `-b * d` in the real part computation
    // For a complex number like 2 + i, d = a^2 + b^2 = 4 + 1 = 5
    // Original: a/d = 2/5, -b/d = -1/5
    // Mutated:  a/d = 2/5, -b*d = -1*5 = -5
    // These give very different results
    
    const c = new Complex(2, 1);
    const result = c.acsc();
    
    // The expected value can be computed as asin(1/c)
    // 1/c = (2-i)/(4+1) = (2/5, -1/5)
    const oneOverC = new Complex(2 / 5, -1 / 5);
    const expected = oneOverC.asin();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});