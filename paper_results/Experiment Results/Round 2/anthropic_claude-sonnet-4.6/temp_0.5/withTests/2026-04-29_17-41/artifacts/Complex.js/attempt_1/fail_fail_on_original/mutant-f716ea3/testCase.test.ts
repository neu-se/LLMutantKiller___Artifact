import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex atanh mutation test', () => {
  it('should return NaN for atanh(0+0i) when d===0 path is taken', () => {
    // When a=0, b=0: d = a*a + b*b = 0, so the else branch is taken
    // Original: (a !== -1) ? (a/0) : 0 = (0 !== -1) ? (0/0) : 0 = NaN
    // Mutated: (false) ? (a/0) : 0 = 0
    const result = new Complex(0, 0).atanh();
    expect(result.isNaN()).toBe(true);
  });
});