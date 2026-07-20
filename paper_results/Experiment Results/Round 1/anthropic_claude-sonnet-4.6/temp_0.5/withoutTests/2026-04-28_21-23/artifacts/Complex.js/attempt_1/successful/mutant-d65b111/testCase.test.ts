import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should correctly compute asech for a complex number with non-zero real and imaginary parts", () => {
    // For asech, we need d = a*a + b*b (original)
    // The mutation changes it to d = a*a + b/b
    // For b = 2: original d = a*a + 4, mutated d = a*a + 1
    // This will produce different results for the intermediate computation
    
    const a = 2;
    const b = 2;
    const c = new Complex(a, b);
    const result = c.asech();
    
    // Compute expected value manually using the correct formula
    // asech(z) = acosh(1/z)
    // 1/z = (a - bi) / (a^2 + b^2)
    const d = a * a + b * b; // = 4 + 4 = 8
    const invRe = a / d;     // = 2/8 = 0.25
    const invIm = -b / d;    // = -2/8 = -0.25
    
    const expected = new Complex(invRe, invIm).acosh();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});