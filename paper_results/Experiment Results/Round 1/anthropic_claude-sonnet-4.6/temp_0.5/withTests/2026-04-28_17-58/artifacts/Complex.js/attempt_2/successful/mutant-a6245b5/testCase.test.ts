import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should return a non-NaN imaginary part for atanh(1 + 0i)", () => {
    // When a=1, b=0: oneMinus=0, d=0, so we hit the else branch
    // Original: (b !== 0) ? (b / 0) : 0  => b===0, so im = 0
    // Mutated:  (b === 0) ? (b / 0) : 0  => b===0, so im = 0/0 = NaN
    // After processing: x['im'] = atan2(0, logHypot(0,0)) / 2 = 0
    // But with mutation, x['im'] starts as NaN -> result is NaN
    const result = new Complex(1, 0).atanh();
    expect(result.isNaN()).toBe(false);
  });
});