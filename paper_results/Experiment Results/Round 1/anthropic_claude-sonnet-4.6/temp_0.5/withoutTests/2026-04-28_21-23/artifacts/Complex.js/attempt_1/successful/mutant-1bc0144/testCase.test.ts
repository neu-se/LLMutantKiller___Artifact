import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec function", () => {
  it("should correctly compute the inverse secant of a real number", () => {
    // asec(2) should return a valid complex number
    // In the original code, var a = this['re'] correctly gets the real part
    // In the mutated code, var a = this[""] gets undefined, breaking the calculation
    const c = new Complex(2, 0);
    const result = c.asec();
    
    // asec(2) = acos(1/2) = π/3 ≈ 1.0471975511965976
    const expected = Math.PI / 3;
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});