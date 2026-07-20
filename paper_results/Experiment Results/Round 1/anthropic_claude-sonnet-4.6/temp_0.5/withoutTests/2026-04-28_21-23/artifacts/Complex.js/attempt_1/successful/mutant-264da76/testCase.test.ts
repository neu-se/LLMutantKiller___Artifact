import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should correctly compute acoth for a complex number with non-zero imaginary part", () => {
    // acoth(c) = log((c+1) / (c-1)) / 2
    // For c = 2 + i, the real part of the intermediate computation uses a/d
    // Original: new Complex(a/d, -b/d).atanh()
    // Mutant:   new Complex(a/d, -b*d).atanh()
    // where d = a*a + b*b
    
    // Use c = 2 + i
    // d = 4 + 1 = 5
    // Original: new Complex(2/5, -1/5).atanh()
    // Mutant:   new Complex(2/5, -1*5).atanh() = new Complex(0.4, -5).atanh()
    
    const c = new Complex(2, 1);
    const result = c.acoth();
    
    // Expected value: acoth(2+i) computed correctly
    // acoth(z) = atanh(1/z) = atanh((2-i)/5) = atanh(0.4 - 0.2i)
    // Let's compute expected value manually:
    // atanh(a + bi) where a=0.4, b=-0.2
    // The result should have specific re and im values
    
    // Compute expected using the formula directly
    // acoth(2+i): using log((c+1)/(c-1))/2
    // (c+1) = 3+i, (c-1) = 1+i
    // (3+i)/(1+i) = (3+i)(1-i)/((1+i)(1-i)) = (3-3i+i-i^2)/(1+1) = (4-2i)/2 = 2-i
    // log(2-i) = log(sqrt(5)) + i*atan2(-1,2)
    // = 0.5*log(5) + i*atan2(-1,2)
    // / 2 => re = log(5)/4, im = atan2(-1,2)/2
    
    const expectedRe = Math.log(5) / 4;
    const expectedIm = Math.atan2(-1, 2) / 2;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});