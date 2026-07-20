import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('atanh(0, -Inf) and atanh(0, +Inf) should differ', () => {
    const neg = new Complex(0, -Infinity).atanh();
    const pos = new Complex(0, Infinity).atanh();
    expect(neg.im).not.toBe(pos.im);
  });
});