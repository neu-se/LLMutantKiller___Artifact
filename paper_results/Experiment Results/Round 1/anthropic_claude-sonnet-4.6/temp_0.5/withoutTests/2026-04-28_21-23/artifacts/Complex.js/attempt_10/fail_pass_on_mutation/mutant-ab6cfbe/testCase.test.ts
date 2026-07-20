import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow zero base', () => {
  it('pow(0+0i, 2) real part sign', () => {
    const result = new Complex(0, 0).pow(2);
    expect(Object.is(result.re, -0)).toBe(true);
  });
});