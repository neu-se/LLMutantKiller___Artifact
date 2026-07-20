import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech mutation detection", () => {
  it("asech of a purely real number greater than 1 should return a purely imaginary result", () => {
    // asech(2) = acosh(1/2) = i * acos(1/2) ≈ i * 1.0471975511965976
    // In mutated code: b = this[""] = undefined
    // d = 4 + undefined = NaN
    // new Complex(2/NaN, -undefined/NaN) = new Complex(NaN, NaN)
    // acosh(NaN+NaN*i) should give NaN
    const c = new Complex(2, 0);
    const result = c.asech();
    
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.acos(0.5), 8);
  });
});