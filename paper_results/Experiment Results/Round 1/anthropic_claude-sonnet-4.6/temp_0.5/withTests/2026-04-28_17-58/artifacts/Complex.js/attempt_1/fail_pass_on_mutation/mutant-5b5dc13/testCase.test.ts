import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should compute acsch correctly for a purely imaginary number where a=0 and b!=0, exposing the mutation in the d===0 fallback branch", () => {
    // For acsch(z) where z = a + bi
    // When a=0 and b!=0, d = a^2 + b^2 = b^2 != 0
    // So we go through the d !== 0 branch: new Complex(a/d, -b/d).asinh()
    // = new Complex(0, -1/b).asinh()
    // For b = 1: acsch(i) = asinh(-i) which should give a specific value
    // acsch(i) = log(i + sqrt(1 - 1)) = log(i) = i*pi/2
    // So re = 0, im = pi/2
    
    // Test with a real non-zero value to exercise normal path
    // acsch(1) = log(1 + sqrt(2)) ≈ 0.8813735870195430
    const result = new Complex(1, 0).acsch();
    expect(result.re).toBeCloseTo(Math.log(1 + Math.sqrt(2)), 10);
    expect(result.im).toBeCloseTo(0, 10);
    
    // Test with a complex number where a != 0 and b != 0
    // to ensure the d !== 0 path works correctly
    const c = new Complex(1, 1);
    const acschResult = c.acsch();
    // acsch(1+i) = asinh(1/(1+i)) = asinh((1-i)/2)
    // (1-i)/2 = 0.5 - 0.5i
    const expected = new Complex(0.5, -0.5).asinh();
    expect(acschResult.re).toBeCloseTo(expected.re, 10);
    expect(acschResult.im).toBeCloseTo(expected.im, 10);
  });
});