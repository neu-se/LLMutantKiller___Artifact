import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec function", () => {
  it("should correctly compute asec for a large real number", () => {
    // For asec(x) where x >> 1, result approaches PI/2
    // asec(1000) ≈ acos(0.001) ≈ PI/2 - 0.001
    const c = new Complex(1000, 0);
    const result = c.asec();
    const expected = Math.acos(1/1000);
    
    // Check the real part is close to acos(1/1000)
    expect(Math.abs(result.re - expected)).toBeLessThan(1e-10);
    // Check imaginary part is essentially 0
    expect(Math.abs(result.im)).toBeLessThan(1e-10);
  });
});