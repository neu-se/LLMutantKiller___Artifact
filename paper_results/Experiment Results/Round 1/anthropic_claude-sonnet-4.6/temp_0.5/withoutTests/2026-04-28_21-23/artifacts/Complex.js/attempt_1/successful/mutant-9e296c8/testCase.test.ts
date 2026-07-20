import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csch function", () => {
  it("should correctly compute csch for a complex number with non-trivial real and imaginary parts", () => {
    // csch(c) = 2 / (e^c - e^-c)
    // For c = 1 + i, the formula uses d = Math.cos(2*b) - cosh(2*a)
    // Original: d = Math.cos(2 * b) - cosh(2 * a)  where a=1, b=1
    // Mutated:  d = Math.cos(2 * b) - cosh(2 / a)  where a=1, b=1
    // When a=1: cosh(2*1) = cosh(2) ≈ 3.7622, cosh(2/1) = cosh(2) ≈ 3.7622 (same!)
    // Need a value where 2*a != 2/a, i.e., a != 1 and a != -1
    
    // Use a = 2, b = 1
    // Original: d = Math.cos(2) - cosh(4)  ≈ -0.4161 - 27.308 ≈ -27.724
    // Mutated:  d = Math.cos(2) - cosh(1)  ≈ -0.4161 - 1.5431 ≈ -1.959
    
    const c = new Complex(2, 1);
    const result = c.csch();
    
    // Compute expected value manually
    // csch(2+i) = -2*sinh(2)*cos(1)/d + i*2*cosh(2)*sin(1)/d
    // where d = Math.cos(2) - cosh(4)
    const a = 2;
    const b = 1;
    const coshA = Math.cosh(a);
    const sinhA = Math.sinh(a);
    const d = Math.cos(2 * b) - Math.cosh(2 * a);
    
    const expectedRe = -2 * sinhA * Math.cos(b) / d;
    const expectedIm = 2 * coshA * Math.sin(b) / d;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});