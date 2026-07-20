import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute the hyperbolic secant of a complex number", () => {
    // sech(z) = 2 / (e^z + e^-z) = 2*cosh(a)*cos(b)/d - 2i*sinh(a)*sin(b)/d
    // where d = cos(2b) + cosh(2a)
    // For z = 1 + i:
    const z = new Complex(1, 1);
    const result = z.sech();
    
    // Expected values computed from the formula:
    // a=1, b=1
    // d = cos(2) + cosh(2) ≈ -0.4161468 + 3.7621957 ≈ 3.3460489
    // re = 2*cosh(1)*cos(1)/d ≈ 2*1.5430806*0.5403023/3.3460489 ≈ 0.4983370
    // im = -2*sinh(1)*sin(1)/d ≈ -2*1.1752012*0.8414710/3.3460489 ≈ -0.5910838
    
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(0.4983370, 5);
    expect(result.im).toBeCloseTo(-0.5910838, 5);
  });
});