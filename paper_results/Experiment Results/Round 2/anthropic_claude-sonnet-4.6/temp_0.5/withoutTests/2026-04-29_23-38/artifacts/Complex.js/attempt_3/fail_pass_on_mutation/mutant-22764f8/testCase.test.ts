import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec function", () => {
  it("should return a finite real result for asec(2)", () => {
    // asec(2) = acos(1/2) = PI/3 ≈ 1.0471975511965976
    // With mutation: a = this[""] = undefined, so d = NaN, result is NaN
    const c = new Complex(2, 0);
    const result = c.asec();
    
    expect(result.isNaN()).toBe(false);
    expect(result.re).toBeCloseTo(Math.PI / 3, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});