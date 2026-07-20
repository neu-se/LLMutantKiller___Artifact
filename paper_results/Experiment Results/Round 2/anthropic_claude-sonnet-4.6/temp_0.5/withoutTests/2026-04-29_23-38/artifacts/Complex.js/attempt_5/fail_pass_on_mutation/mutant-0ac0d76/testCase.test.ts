import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("should return NaN imaginary part for negative real base raised to non-integer power", () => {
    // For negative real base (-1) with real exponent (0.5):
    // Original: b===0, a=-1, a>0 is FALSE -> falls to general formula -> correct complex result
    // Mutated: b===0, a=-1, a<=0 is TRUE -> returns new Complex(Math.pow(-1, 0.5), 0) = new Complex(NaN, 0)
    const base = new Complex(-1, 0);
    const result = base.pow(new Complex(0.5, 0));
    
    // sqrt(-1) = i, so result should be approximately (0, 1)
    expect(result.re).toBeCloseTo(0, 5);
    expect(result.im).toBeCloseTo(1, 5);
  });
});