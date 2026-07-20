import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot function", () => {
  it("should compute acot of a complex number with non-zero imaginary part correctly", () => {
    // For acot(z) where z has imaginary part, the result should be finite and well-defined
    // Using a purely imaginary number: acot(2i)
    // acot(c) = i/2 * log((c-i)/(c+i))
    // For c = 2i: acot(2i) = i/2 * log((2i-i)/(2i+i)) = i/2 * log(i/3i) = i/2 * log(1/3)
    // = i/2 * (-log(3)) = -i*log(3)/2
    // So re = 0, im = -log(3)/2 ≈ -0.5493
    
    const result = new Complex(0, 2).acot();
    
    // The real part should be 0 (or very close to it)
    // The imaginary part should be -log(3)/2 ≈ -0.5493
    // With the mutation, d = 0*0 + 2*2 = 4, and (d === 0) is false,
    // so it takes the wrong branch producing Infinity-based results
    
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    expect(result.im).toBeCloseTo(-Math.log(3) / 2, 10);
  });
});