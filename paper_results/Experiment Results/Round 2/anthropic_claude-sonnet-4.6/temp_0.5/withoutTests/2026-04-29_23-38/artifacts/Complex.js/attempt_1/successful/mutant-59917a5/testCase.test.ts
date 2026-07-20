import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('atanh mutation detection', () => {
  it('should return correct imaginary part for atanh(1)', () => {
    const result = new Complex(1, 0).atanh();
    // atanh(1) = Infinity + 0i
    // The imaginary part should be +0, not -0
    // Object.is distinguishes +0 from -0
    expect(Object.is(result['im'], 0)).toBe(true);
    expect(Object.is(result['im'], -0)).toBe(false);
  });
});