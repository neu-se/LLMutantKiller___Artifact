import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot mutation detection", () => {
  it("should correctly compute acot when d=0 with non-zero imaginary part by testing acot(0, small) approaches", () => {
    // The mutation changes -b/0 to +b/0 in the acot fallback branch
    // This branch is reached when d = a*a + b*b = 0 AND b != 0, which is impossible for real numbers
    // However, we can test the sign convention of acot for negative imaginary inputs
    // acot(z) = atan(1/z), so acot(0 + bi) = atan(1/(bi)) = atan(-i/b)
    // For b > 0: acot(0 + bi) should have negative imaginary part in the result
    // Testing with a small positive imaginary value
    const c = new Complex(0, 2);
    const result = c.acot();
    // acot(2i) = atan(1/(2i)) = atan(-i/2)
    // atan(-i/2): a=0, b=-0.5
    // d = 0 + 0.25 = 0.25
    // new Complex((1 - 0.25 - 0) / 0.25, -2*0/0.25).log() => new Complex(3, 0).log()
    // result re = -0.5 * Im(log(3)) = 0, im = 0.5 * Re(log(3)) = 0.5 * ln(3)
    // So acot(2i).re = 0, acot(2i).im = 0.5 * ln(3) ≈ 0.5493
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0.5 * Math.log(3), 10);
    
    // For negative imaginary: acot(0 - 2i) should have opposite sign
    const c2 = new Complex(0, -2);
    const result2 = c2.acot();
    expect(result2.re).toBeCloseTo(0, 10);
    expect(result2.im).toBeCloseTo(-0.5 * Math.log(3), 10);
  });
});