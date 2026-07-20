import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should return correct imaginary part when acos result has positive imaginary part", () => {
    // We need a value where acos(z).im > 0, triggering the else branch in acosh
    // For z = 0 - 2i (negative imaginary), acos gives im > 0
    const z = new Complex(0, -2);
    const result = z.acosh();
    
    // In the mutated code, the else branch sets res['im'] = -res[""] = -undefined = NaN
    // So the imaginary part would be NaN in the mutated code
    // In the original code, res['im'] = -res['re'] (a valid number)
    
    // acosh(-2i) should be a valid complex number
    // acosh(z) = i * acos(z) effectively (via the swap logic)
    // The result should not be NaN
    expect(isNaN(result.im)).toBe(false);
    
    // acosh(-2i): acos(-2i) gives some complex number with im > 0
    // then acosh swaps: re = im_of_acos, im = -re_of_acos
    // Let's verify the actual value
    // acosh(-2i) = log(-2i + sqrt(-4-1)) = log(-2i + sqrt(-5))
    // = log(-2i + i*sqrt(5)) = log(i*(sqrt(5)-2))
    // = log(sqrt(5)-2) + i*pi/2
    // So re = log(sqrt(5)-2) ≈ log(0.2361) ≈ -1.443, im = pi/2 ≈ 1.5708
    
    expect(result.re).toBeCloseTo(Math.log(Math.sqrt(5) - 2), 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});