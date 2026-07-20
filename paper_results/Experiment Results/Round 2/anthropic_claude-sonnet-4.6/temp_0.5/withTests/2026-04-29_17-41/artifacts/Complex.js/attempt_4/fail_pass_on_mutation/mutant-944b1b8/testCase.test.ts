import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('asec mutation detection', () => {
  it('asec(0+i) real part should equal PI/2', () => {
    const result = new Complex(0, 1).asec();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeGreaterThan(0);
  });
});