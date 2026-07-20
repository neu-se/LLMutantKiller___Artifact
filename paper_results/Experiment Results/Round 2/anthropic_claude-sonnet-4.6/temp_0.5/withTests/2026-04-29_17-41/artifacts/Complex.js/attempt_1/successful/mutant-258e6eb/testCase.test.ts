import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("atanh mutation detection", () => {
  it("should correctly compute atanh for a purely imaginary number where noIM is false", () => {
    // atanh(i) = i * π/4 ≈ 0 + 0.7853981633974483i
    // noIM = (a > 1 && b === 0) = (0 > 1 && 1 === 0) = false
    // Original: x['im'] is NOT negated -> imaginary part is positive
    // Mutated: x['im'] IS negated -> imaginary part is negative
    const result = new Complex(0, 1).atanh();
    
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 4, 10);
  });
});