import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex asec mutation test', () => {
  it('should correctly compute asec(i) where real part is 0', () => {
    const result = new Complex(0, 1).asec();
    // With original: real part of inner complex is (a !== 0) ? a/0 : 0 = 0
    // With mutation: real part of inner complex is (true) ? a/0 : 0 = 0/0 = NaN
    expect(result.isNaN()).toBe(false);
    expect(isFinite(result.re)).toBe(true);
  });
});