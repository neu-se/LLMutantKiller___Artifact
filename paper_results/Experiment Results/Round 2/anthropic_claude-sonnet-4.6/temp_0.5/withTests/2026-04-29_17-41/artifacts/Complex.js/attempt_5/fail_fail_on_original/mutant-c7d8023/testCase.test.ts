import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acsch', () => {
  it('handles subnormal imaginary part where b*b underflows to zero', () => {
    // b = Number.MIN_VALUE: b !== 0, but b*b underflows to 0
    // So d = 0, hitting the else branch
    // Original: (b !== 0) ? -b/0 : 0 => -Infinity
    // Mutated: (b === 0) ? -b/0 : 0 => 0
    const result = new Complex(0, Number.MIN_VALUE).acsch();
    expect(result.im).toBe(-Infinity);
  });
});