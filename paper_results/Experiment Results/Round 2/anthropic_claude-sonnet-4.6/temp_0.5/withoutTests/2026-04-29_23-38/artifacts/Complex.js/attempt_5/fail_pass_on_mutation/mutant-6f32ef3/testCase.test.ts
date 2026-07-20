import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('toString of real number should not contain space', () => {
    expect(new Complex(3, 0).toString()).toBe('3');
  });
});