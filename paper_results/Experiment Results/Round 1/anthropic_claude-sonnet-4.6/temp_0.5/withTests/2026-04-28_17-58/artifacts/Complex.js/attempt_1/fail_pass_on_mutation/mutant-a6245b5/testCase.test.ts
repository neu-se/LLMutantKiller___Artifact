import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should return 0 for atanh(0 + 0i) without NaN in imaginary part", () => {
    // When a=0, b=0, d=a*a+b*b=0, so we hit the else branch
    // Original: (b !== 0) ? (b / 0) : 0  => b===0, so im = 0
    // Mutated:  (b === 0) ? (b / 0) : 0  => b===0, so im = 0/0 = NaN
    const result = new Complex(0, 0).atanh();
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    expect(result.isNaN()).toBe(false);
  });
});