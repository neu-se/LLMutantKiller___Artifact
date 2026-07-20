import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acot mutation test', () => {
  it('should return negative infinity imaginary part when d underflows to zero with positive b', () => {
    // Use denormalized numbers so small that a*a + b*b underflows to 0
    // but b itself is not 0, triggering the d===0 branch with b !== 0
    const tiny = 5e-324; // Number.MIN_VALUE
    const c = new Complex(tiny, tiny);
    const result = c.acot();
    // Original: -b/0 = -Infinity (b > 0), so im part of atan input is -Infinity
    // Mutated: +b/0 = +Infinity (b > 0), so im part of atan input is +Infinity
    // The sign of the infinity matters for atan result
    expect(result.im).toBeLessThan(0);
  });
});