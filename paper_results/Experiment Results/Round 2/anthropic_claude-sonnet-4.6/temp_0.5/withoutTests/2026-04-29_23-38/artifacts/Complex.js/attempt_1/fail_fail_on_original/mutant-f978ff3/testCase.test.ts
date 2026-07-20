import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csch function", () => {
  it("should correctly compute the real part of csch for a complex number", () => {
    // csch(c) = 2 / (e^c - e^-c)
    // For c = 1 + i, we test the real part
    // The real part formula uses: -2 * sinh(a) * Math.sin(b) / d
    // where d = Math.cos(2*b) - cosh(2/a)
    // The mutation changes / d to * d in the real part computation
    
    const c = new Complex(1, 1);
    const result = c.csch();
    
    // Expected values computed from the correct formula:
    // a = 1, b = 1
    // d = cos(2) - cosh(2) ≈ -0.4161 - 3.7622 ≈ -4.1783
    // re = -2 * sinh(1) * sin(1) / d ≈ -2 * 1.1752 * 0.8415 / (-4.1783) ≈ 0.4729
    // im = 2 * cosh(1) * sin(1) / d ≈ 2 * 1.5431 * 0.8415 / (-4.1783) ≈ -0.6215
    
    const a = 1;
    const b = 1;
    const d = Math.cos(2 * b) - Math.cosh(2 / a);
    const expectedRe = -2 * Math.sinh(a) * Math.sin(b) / d;
    const expectedIm = 2 * Math.cosh(a) * Math.sin(b) / d;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});