import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec method", () => {
  it("should correctly compute asec for a real number greater than 1", () => {
    // asec(2) should use this['re'] correctly
    // In the mutated code, var a = this[""] which is undefined
    // This would cause the computation to fail or produce wrong results
    const c = new Complex(2, 0);
    const result = c.asec();
    
    // asec(2) = acos(1/2) = π/3 ≈ 1.0471975511965976
    const expected = Math.acos(0.5);
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});