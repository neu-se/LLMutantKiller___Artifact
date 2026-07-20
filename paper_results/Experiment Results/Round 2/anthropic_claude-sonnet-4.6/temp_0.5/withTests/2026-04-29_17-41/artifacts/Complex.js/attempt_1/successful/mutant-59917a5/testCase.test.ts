import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('atanh mutation detection', () => {
  it('atanh(1) should have positive zero imaginary part, not negative zero', () => {
    const result = new Complex(1, 0).atanh();
    // The imaginary part should be +0, not -0
    // 1 / +0 = +Infinity, 1 / -0 = -Infinity
    expect(1 / result['im']).toBe(Infinity);
  });
});