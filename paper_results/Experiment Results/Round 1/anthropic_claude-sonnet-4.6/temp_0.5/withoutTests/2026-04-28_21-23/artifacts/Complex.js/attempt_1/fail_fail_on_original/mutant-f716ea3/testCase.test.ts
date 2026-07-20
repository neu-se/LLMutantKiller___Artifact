import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should return NaN when atanh is called on zero (0 + 0i) due to division by zero in fallback branch", () => {
    // When d = a*a + b*b = 0 (i.e., a=0, b=0), the fallback branch is taken.
    // Original: (a !== -1) ? (a / 0) : 0 => (0 !== -1) ? (0/0) : 0 => NaN
    // Mutated:  (false) ? (a / 0) : 0 => 0
    // However, atanh(0) = 0 mathematically, so we need to find a case where
    // the mutation actually changes observable behavior.
    // 
    // Actually when a=0, b=0: d=0, so fallback: re = (0 !== -1) ? 0/0 : 0 = NaN (original)
    // vs re = (false) ? 0/0 : 0 = 0 (mutated)
    const result = new Complex(0, 0).atanh();
    expect(result.isNaN()).toBe(true);
  });
});