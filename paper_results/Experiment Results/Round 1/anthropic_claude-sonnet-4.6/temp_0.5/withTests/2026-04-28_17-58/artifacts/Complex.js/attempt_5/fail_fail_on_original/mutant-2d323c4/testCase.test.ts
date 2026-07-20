import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch', () => {
  it('computes acsch for a=1, b=1 where d=0', () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    expect(result.isNaN()).toBe(true);
  });
});