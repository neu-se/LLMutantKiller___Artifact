import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('asec', () => {
  it('asec(0+i) real part should match expected value', () => {
    const result = new Complex(0, 1).asec();
    expect(result.re).toBeCloseTo(1.5707963267948966, 10);
    expect(result.im).toBeCloseTo(0.8813735870195429, 10);
  });
});