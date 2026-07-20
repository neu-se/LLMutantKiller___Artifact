import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex exp mutation detection', () => {
  it('exp of purely real number should produce result with im equal to positive zero not negative zero', () => {
    const result = new Complex(5, 0).exp();
    // Math.sin(0) = +0, so im should be Math.exp(5) * 0 = +0
    // Check sign of zero
    expect(1 / result.im).toBe(Infinity); // +0 gives +Infinity, -0 gives -Infinity
  });
});