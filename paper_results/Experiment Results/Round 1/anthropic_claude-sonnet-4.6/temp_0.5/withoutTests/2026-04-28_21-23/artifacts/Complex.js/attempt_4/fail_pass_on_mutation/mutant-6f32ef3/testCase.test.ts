import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('purely imaginary negative number should not have a space before minus sign', () => {
    expect(new Complex(0, -3).toString()).toBe('-3i');
  });
});