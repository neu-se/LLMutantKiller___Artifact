import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('should format complex number with space before sign', () => {
    expect(new Complex(3, -2).toString()).toBe('3 - 2i');
  });
});