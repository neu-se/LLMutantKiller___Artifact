import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc function", () => {
  it("should correctly compute the inverse cosecant of a complex number", () => {
    // acsc(z) for z = 2 + i
    // The mutation changes `-b / d` to `-b * d` in the real part computation
    // For z = 2 + i: a=2, b=1, d = a*a + b*b = 4+1 = 5
    // Original: new Complex(a/d, -b/d).asin() = new Complex(2/5, -1/5).asin()
    // Mutated:  new Complex(a*d, -b*d).asin() = new Complex(2*5, -1*5).asin() = new Complex(10, -5).asin()
    
    const z = new Complex(2, 1);
    const result = z.acsc();
    
    // Expected value: acsc(2+i) computed correctly
    // Using the formula: acsc(z) = asin(1/z)
    // 1/(2+i) = (2-i)/(4+1) = (2/5) - (1/5)i
    // asin((2/5) - (1/5)i)
    
    const expected = new Complex(2, 1).inverse().asin();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});