import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('asec mutation detection', () => {
  it('asec(0+i) should produce a non-NaN result', () => {
    const result = new Complex(0, 1).asec();
    expect(result.isNaN()).toBe(false);
  });
});