import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow', () => {
  it('pow of zero base with negative non-integer exponent', () => {
    const result = new Complex(0, 0).pow(-0.5);
    expect(result.isNaN()).toBe(true);
  });
});