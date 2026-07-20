import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a complex number with non-zero imaginary part", () => {
    // acsch(c) = log((1+sqrt(1+c^2))/c)
    // For c = 1 + i, we test that the real part of acsch is computed correctly
    // The mutation changes -b/d to +b/d in the acsch computation
    // This affects the imaginary part passed to asinh
    
    const c = new Complex(1, 1);
    const result = c.acsch();
    
    // Verify against known value: acsch(1+i) should have specific re and im
    // The correct result can be verified by computing acsch manually
    // acsch(z) = asinh(1/z) = asinh(z*/|z|^2)
    // For z = 1+i: z* = 1-i, |z|^2 = 2
    // So 1/z = (1-i)/2 = 0.5 - 0.5i
    // asinh(0.5 - 0.5i)
    
    const expected = new Complex(0.5, -0.5).asinh();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});