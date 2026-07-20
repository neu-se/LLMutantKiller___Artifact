import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should correctly compute atanh for real number greater than 1", () => {
    // For a=2, b=0: noIM=true, d=4, goes through d!==0 branch, result should have im=0
    // For a=1, b=0: d=0... no wait d=(1-1)^2+0=0
    // When a=1, b=0: oneMinus=0, onePlus=2, d=0
    // Original: Complex((1!==-1)?(1/0):0, 0) = Complex(Infinity, 0)
    // Mutated:  Complex((1!==-1)?(1*0):0, 0) = Complex(0, 0)
    const result = new Complex(1, 0).atanh();
    expect(isFinite(result.re)).toBe(false);
  });
});