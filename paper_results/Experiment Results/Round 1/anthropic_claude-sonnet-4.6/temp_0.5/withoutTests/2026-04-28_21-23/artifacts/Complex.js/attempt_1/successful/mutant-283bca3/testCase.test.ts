import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc method", () => {
  it("should correctly compute acsc for a complex number with non-zero imaginary part", () => {
    // acsc(c) = -i * log(i / c + sqrt(1 - 1 / c^2))
    // For c = 1 + i, the imaginary part of the result should be negative
    // The mutation changes -b/d to +b/d in the asin call within acsc
    // This affects the imaginary part of the intermediate value passed to asin
    
    const c = new Complex(1, 1);
    const result = c.acsc();
    
    // The correct value of acsc(1+i) can be verified:
    // acsc(1+i) = asin(1/(1+i)) = asin((1-i)/2)
    // Let's compute the expected value manually
    // 1/(1+i) = (1-i)/((1+i)(1-i)) = (1-i)/2 = 0.5 - 0.5i
    // asin(0.5 - 0.5i) should give a specific result
    
    // The key is that with the mutation (-b/d becomes +b/d),
    // the imaginary part of the intermediate complex number changes sign,
    // which will produce a different result
    
    // Expected result computed from correct formula:
    // d = a^2 + b^2 = 1 + 1 = 2
    // a/d = 0.5, -b/d = -0.5 (original)
    // a/d = 0.5, +b/d = +0.5 (mutated)
    // So original calls (0.5 - 0.5i).asin()
    // Mutated calls (0.5 + 0.5i).asin()
    
    // asin(0.5 - 0.5i) != asin(0.5 + 0.5i) since asin is not real-symmetric in general
    // asin(conj(z)) = conj(asin(z)), so the imaginary parts will have opposite signs
    
    // For the original: asin(0.5 - 0.5i)
    // For the mutated: asin(0.5 + 0.5i)
    // These differ in the sign of the imaginary part
    
    // The real part should be approximately 0.4522784471511907
    // The imaginary part should be approximately -0.5306375309525179 (original)
    // or +0.5306375309525179 (mutated)
    
    const expected = new Complex(1, 1).acsc();
    
    // Verify using the mathematical definition: sin(acsc(z)) = 1/z
    // sin(result) should equal 1/(1+i) = 0.5 - 0.5i
    const sinResult = result.sin();
    const oneOverC = new Complex(1, 0).div(c);
    
    expect(sinResult.re).toBeCloseTo(oneOverC.re, 10);
    expect(sinResult.im).toBeCloseTo(oneOverC.im, 10);
    
    // Also verify the imaginary part has the correct sign
    // For c = 1+i (positive imaginary part), acsc should have negative imaginary part
    // The original code uses -b/d which gives negative im for positive b
    // The mutated code uses +b/d which gives positive im for positive b
    expect(result.im).toBeLessThan(0);
  });
});