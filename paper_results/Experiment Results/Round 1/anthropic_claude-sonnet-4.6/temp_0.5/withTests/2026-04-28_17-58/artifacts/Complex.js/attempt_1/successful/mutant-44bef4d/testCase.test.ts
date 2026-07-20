import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("should correctly compute acsc for a complex number with non-zero imaginary part", () => {
    // acsc(1 + i) 
    // d = 1^2 + 1^2 = 2
    // Original: new Complex(1/2, -1/2).asin()
    // Mutated: new Complex(1/2, -1*2).asin() = new Complex(0.5, -2).asin()
    const result = new Complex(1, 1).acsc();
    
    // Expected value computed from the original formula:
    // acsc(z) = asin(1/z) = asin(a/d - i*b/d) where d = a^2 + b^2
    // 1/z = 1/(1+i) = (1-i)/2 = 0.5 - 0.5i
    // asin(0.5 - 0.5i)
    const expected = new Complex(0.5, -0.5).asin();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});