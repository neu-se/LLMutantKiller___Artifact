import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asech', () => {
  it('detects mutation in asech fallback branch by bypassing isZero', () => {
    const c = new Complex(0, 0);
    c['isZero'] = () => false;
    const result = c.asech();
    expect(result.isNaN()).toBe(false);
  });
});