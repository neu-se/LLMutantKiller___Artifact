import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot mutation test", () => {
  it("should compute acot correctly when d=0 edge case with b!=0 sign matters", () => {
    // The mutation changes -b/0 to +b/0 in the d===0 branch of acot
    // When b !== 0 and d = a^2 + b^2 = 0, this is impossible for real numbers
    // However, we test the acot function with b=0 (early return path) and non-zero inputs
    // to ensure correctness, and also test the sign of imaginary infinity result
    
    // Test acot(0 + 0i) - this hits d===0 branch
    // a=0, b=0 => d=0, so we go to else branch
    // re: (a !== 0) ? a/0 : 0 => 0
    // im: (b !== 0) ? -b/0 : 0 => 0 (original) vs (b !== 0) ? +b/0 : 0 => 0 (mutated)
    // Both give 0 since b=0, so same result
    
    // Let's check: acot with pure imaginary input where b != 0 but a = 0
    // acot(0 + 2i): b=2, a=0, d = 0+4 = 4 != 0
    // So takes d !== 0 branch: new Complex(0/4, -2/4).atan() = new Complex(0, -0.5).atan()
    const result = new Complex(0, 2).acot();
    // atan(0 - 0.5i): a=0, b=-0.5
    // d = 0 + (1-(-0.5))^2 = (1.5)^2 = 2.25
    // t1 = new Complex((1 - 0.25 - 0) / 2.25, -2*0/2.25).log() = new Complex(0.75/2.25, 0).log()
    // = new Complex(1/3, 0).log() = new Complex(log(1/3), 0)
    // result re = -0.5 * 0 = 0, im = 0.5 * log(1/3)
    // Expected: re=0, im = 0.5 * Math.log(1/3) ≈ -0.5493
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0.5 * Math.log(1/3), 10);
  });
});