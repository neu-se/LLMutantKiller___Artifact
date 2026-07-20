import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec function", () => {
  it("should return correct value for asec with imaginary component", () => {
    // Use complex number where both re and im are non-zero
    // asec(1+i): d = 1+1 = 2, a/d = 0.5, -b/d = -0.5 -> acos(0.5 - 0.5i)
    // With mutation: a=undefined, d=NaN, result is NaN
    const c = new Complex(1, 1);
    const result = c.asec();
    
    // Compute expected: acos(1/2 - i/2)
    const expected = new Complex(0.5, -0.5).acos();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});