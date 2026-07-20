import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc method", () => {
  it("should correctly compute acsc for a purely imaginary number with non-zero imaginary part", () => {
    // For z = 0 + bi (b !== 0), d = b*b !== 0, so it takes the (d !== 0) branch
    // acsc(i) = asin(1/i) = asin(-i)
    // Test with z = new Complex(0, 2): d = 4 !== 0
    // new Complex(0/4, -2/4) = new Complex(0, -0.5).asin()
    const z = new Complex(0, 2);
    const result = z.acsc();
    
    // asin(0 - 0.5i) = -i * log(0.5i*i + sqrt(1 - (0.5i)^2*(-1)))
    // Let's just verify the result is finite and has expected values
    // acsc(2i) should give a specific complex number
    // Using the formula: acsc(z) = asin(1/z)
    // 1/(2i) = -i/2 = 0 - 0.5i
    // asin(-0.5i) = -i * log(-0.5i*i + sqrt(1 - (-0.5i)^2))
    //             = -i * log(0.5 + sqrt(1 + 0.25))
    //             = -i * log(0.5 + sqrt(1.25))
    const expected = new Complex(0, -0.5).asin();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
    
    // The imaginary part should be negative (not zero, not NaN, not Infinity)
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    expect(result.im).toBeLessThan(0);
  });
});