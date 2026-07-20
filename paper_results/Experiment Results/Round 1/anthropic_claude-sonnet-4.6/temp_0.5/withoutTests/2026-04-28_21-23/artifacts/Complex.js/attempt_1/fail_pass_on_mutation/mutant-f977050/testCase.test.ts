import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a value where res.im > 0 branch is taken", () => {
    // acosh(2) should give a real positive result
    // For real x > 1, acosh(x) = log(x + sqrt(x^2 - 1)) which is real
    // We need a case where the else branch (res['im'] > 0) is taken in acosh
    // Let's use a complex number that triggers the else branch
    
    // For complex number with negative imaginary part, acos gives im > 0
    // Let's test acosh(2 - i) which should give a specific complex result
    const z = new Complex(2, -1);
    const result = z.acosh();
    
    // The expected result can be computed as:
    // acosh(z) = log(z + sqrt(z^2 - 1))
    // For z = 2 - i:
    // z^2 - 1 = (2-i)^2 - 1 = (4 - 4i + i^2) - 1 = (4 - 4i - 1) - 1 = 2 - 4i
    // sqrt(2 - 4i): abs = sqrt(4+16) = sqrt(20), arg = atan2(-4, 2)
    // This is complex, let's just verify the result is a proper complex number
    // with correct real and imaginary parts
    
    // The mutation changes res['im'] = -res['re'] to res['im'] = -res[""]
    // res[""] is undefined, so -undefined = NaN
    // This means in the mutated code, when res['im'] > 0, the imaginary part becomes NaN
    
    // Let's find a value where the else branch is taken (res['im'] > 0 after acos)
    // acos of a number with negative imaginary part tends to have positive imaginary part
    
    // Test with z = 0 + 2i (purely imaginary)
    const z2 = new Complex(0, 2);
    const result2 = z2.acosh();
    
    // acosh(2i) should be a valid complex number, not NaN
    expect(isNaN(result2.re)).toBe(false);
    expect(isNaN(result2.im)).toBe(false);
    
    // The real part should be positive (acosh of imaginary gives positive real part)
    // acosh(2i) = log(2i + sqrt(-4-1)) = log(2i + sqrt(-5))
    // = log(2i + i*sqrt(5)) = log(i*(2+sqrt(5))) = log(|2+sqrt(5)|) + i*pi/2
    // So re ≈ log(2 + 2.236) ≈ log(4.236) ≈ 1.443, im ≈ pi/2 ≈ 1.5708
    
    expect(result2.re).toBeCloseTo(Math.log(2 + Math.sqrt(5)), 10);
    expect(result2.im).toBeCloseTo(Math.PI / 2, 10);
  });
});