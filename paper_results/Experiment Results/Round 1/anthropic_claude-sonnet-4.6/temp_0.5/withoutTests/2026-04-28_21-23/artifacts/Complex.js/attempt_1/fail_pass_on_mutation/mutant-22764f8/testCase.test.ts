import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec function", () => {
  it("should correctly compute the inverse secant of a complex number", () => {
    // asec(2) should be acos(1/2) = π/3 ≈ 1.0472
    const c = new Complex(2, 0);
    const result = c.asec();
    
    // The real part should be approximately π/3 (about 1.0472)
    // and imaginary part should be 0
    expect(result.re).toBeCloseTo(Math.PI / 3, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});