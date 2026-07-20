import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc method", () => {
  it("should correctly compute acsc for a complex number with non-zero imaginary part", () => {
    // acsc(c) = -i * log(i / c + sqrt(1 - 1 / c^2))
    // For c = 1 + i, the imaginary part of the result should have a specific sign
    // The mutation changes -b/d to +b/d in the asin() call within acsc
    // This affects the imaginary component passed to asin
    
    const c = new Complex(1, 1);
    const result = c.acsc();
    
    // The correct value of acsc(1+i) can be computed as:
    // acsc(z) = asin(1/z)
    // 1/(1+i) = (1-i)/2 = 0.5 - 0.5i
    // asin(0.5 - 0.5i) should give a specific result
    
    // Let's compute the expected value using asin(1/z)
    const oneOverC = new Complex(1, 0).div(c);
    const expected = oneOverC.asin();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});