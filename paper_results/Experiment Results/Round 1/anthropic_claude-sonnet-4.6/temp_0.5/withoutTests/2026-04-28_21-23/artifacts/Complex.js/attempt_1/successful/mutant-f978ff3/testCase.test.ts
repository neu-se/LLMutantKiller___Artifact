import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csch function", () => {
  it("should correctly compute the real part of csch for a complex number", () => {
    // csch(c) = 2 / (e^c - e^-c)
    // For c = 1 + i, we can verify the real part
    // The real part should be: -2 * sinh(a) * Math.sin(b) / d
    // where d = Math.cos(2*b) - cosh(2/a) ... wait, let me check the formula
    // Actually d = Math.cos(2*b) - cosh(2*a) based on the correct formula
    // Real part = -2 * sinh(a) * Math.sin(b) / d
    // The mutation changes the real part from division by d to multiplication by d
    
    const c = new Complex(1, 1);
    const result = c.csch();
    
    // Compute expected value manually
    // csch(a + bi) = 1/sinh(a+bi)
    // sinh(a+bi) = sinh(a)*cos(b) + i*cosh(a)*sin(b)
    // So csch = conj(sinh) / |sinh|^2
    const a = 1;
    const b = 1;
    const sinhRe = Math.sinh(a) * Math.cos(b);
    const sinhIm = Math.cosh(a) * Math.sin(b);
    const denom = sinhRe * sinhRe + sinhIm * sinhIm;
    const expectedRe = sinhRe / denom;
    const expectedIm = -sinhIm / denom;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});