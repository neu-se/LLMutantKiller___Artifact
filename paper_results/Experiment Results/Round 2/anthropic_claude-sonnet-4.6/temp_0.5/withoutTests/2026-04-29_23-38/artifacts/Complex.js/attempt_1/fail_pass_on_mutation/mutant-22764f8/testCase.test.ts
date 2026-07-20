import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec function", () => {
  it("should correctly calculate the complex arcus secant for a real number", () => {
    // asec(2) should return acos(1/2) = PI/3
    const c = new Complex(2, 0);
    const result = c.asec();
    
    // The expected result of asec(2) = acos(0.5) ≈ 1.0471975511965976 (PI/3)
    const expected = Math.acos(0.5);
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});