import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh for a purely imaginary number", () => {
    // atanh(i) = i * π/4
    // noIM should be false here (a=0, b=1), so im should NOT be negated
    const result = new Complex(0, 1).atanh();
    
    // The imaginary part should be positive (π/4 ≈ 0.7853981633974483)
    // With mutation (noIM = true always), im would be negated to -π/4
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 4, 10);
  });
});