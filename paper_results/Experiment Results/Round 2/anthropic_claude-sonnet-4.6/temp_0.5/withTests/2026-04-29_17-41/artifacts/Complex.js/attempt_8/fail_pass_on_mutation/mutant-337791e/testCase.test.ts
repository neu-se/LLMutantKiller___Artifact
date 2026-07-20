import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex expm1', () => {
  it('expm1(0) should equal 0', () => {
    const result = new Complex(0, 0).expm1();
    expect(result.re).toBeCloseTo(0, 14);
    expect(result.im).toBeCloseTo(0, 14);
  });
});