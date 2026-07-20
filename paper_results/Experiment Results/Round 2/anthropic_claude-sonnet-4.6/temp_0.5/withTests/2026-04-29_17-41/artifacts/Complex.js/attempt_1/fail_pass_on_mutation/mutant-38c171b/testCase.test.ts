import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch mutation test", () => {
  it("should correctly compute acsch for a purely imaginary number where b is non-zero", () => {
    // Test acsch with a purely imaginary number (a=0, b=2)
    // This exercises the acsch function with b !== 0
    // In the normal path (d !== 0), acsch(0 + 2i) = asinh(0/d + (-2/d)i) = asinh(-i/2)
    const c = new Complex(0, 2);
    const result = c.acsch();
    
    // acsch(2i) = asinh(-i/2) 
    // Let's verify against known value: acsch(bi) = -i * arcsin(1/b) for real b
    // acsch(2i) = -i * arcsin(1/2) = -i * pi/6
    const expected = new Complex(0, -Math.PI / 6);
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});