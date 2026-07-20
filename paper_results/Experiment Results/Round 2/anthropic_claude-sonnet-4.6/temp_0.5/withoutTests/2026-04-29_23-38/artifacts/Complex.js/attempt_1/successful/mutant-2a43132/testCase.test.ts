import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should correctly compute asec for a complex number with non-zero d (a^2 - b^2 != 0)", () => {
    // For asec, d = a^2 - b^2
    // We need d != 0, e.g., a=2, b=0 => d = 4 - 0 = 4
    // In original: returns new Complex(a/d, -b/d).acos()
    // In mutated: always returns new Complex((a!=0)?a/0:0, (b!=0)?-b/0:0).acos()
    // which would return Complex with Infinity values
    
    const c = new Complex(2, 0);
    const result = c.asec();
    
    // asec(2) = acos(1/2) = pi/3 ≈ 1.0472
    const expected = Math.acos(0.5);
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});