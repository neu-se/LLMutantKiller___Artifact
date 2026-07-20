import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec function", () => {
  it("should correctly compute asec for a complex number with non-zero d (a^2 - b^2 != 0)", () => {
    // For asec, d = a*a - b*b
    // We need d != 0 to trigger the original code path
    // Let's use z = 2 + 0i, so a=2, b=0, d = 4 - 0 = 4 (non-zero)
    // asec(2) = acos(1/2) = pi/3
    const z = new Complex(2, 0);
    const result = z.asec();
    
    // asec(2) should be approximately pi/3 ≈ 1.0471975511965976
    const expected = Math.acos(0.5); // pi/3
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});