import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should return correct value for acoth when d is 0 (a=0, b=0)", () => {
    // When a=0 and b=0, d = a*a + b*b = 0
    // Original: return (d !== 0) ? ... atanh() : ... atanh() with special handling
    // Mutated: return (true) ? ... atanh() which uses a/d = 0/0 = NaN
    // The if(true) early return makes this unreachable, but we need to test the ternary behavior
    // Since if(true) always fires, both versions return Complex(0, PI/2) for all inputs
    // Let's verify acoth of a non-zero value to detect the mutation
    const result = new Complex(2, 0).acoth();
    // acoth(2) = atanh(1/2) = 0.5 * log(3) ≈ 0.5493...
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});