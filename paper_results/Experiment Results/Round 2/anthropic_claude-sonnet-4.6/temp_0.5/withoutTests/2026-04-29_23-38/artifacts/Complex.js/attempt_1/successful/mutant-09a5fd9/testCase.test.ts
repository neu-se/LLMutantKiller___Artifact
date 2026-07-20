import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute the real part of sech using cosh(a)*cos(b) not 1/cosh(a)*cos(b)", () => {
    // sech(c) = 2 / (e^c + e^-c)
    // For c = a + bi:
    // re = 2 * cosh(a) * cos(b) / d  where d = cos(2b) + cosh(2a)
    // im = -2 * sinh(a) * sin(b) / d
    
    // Use a = 2, b = 0 for simplicity
    // sech(2) = 1/cosh(2) = 2/(e^2 + e^-2)
    // Expected: re = 1/cosh(2), im = 0
    
    const a = 2;
    const b = 0;
    const result = new Complex(a, b).sech();
    
    const expected = 1 / Math.cosh(2);
    
    // With original code: re = 2 * cosh(2) * cos(0) / (cos(0) + cosh(4)) = 2*cosh(2)/(1+cosh(4))
    // which equals 1/cosh(2) due to identity: 2*cosh(a)/(1+cosh(2a)) = 1/cosh(a)
    // With mutated code: re = 2 / cosh(2) * cos(0) / (cos(0) + cosh(4)) = 2/(cosh(2)*(1+cosh(4)))
    // which is NOT equal to 1/cosh(2)
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});