import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow general case', () => {
  it('(2+0i)^(1+1i) has correct real part approximately 1.538', () => {
    const result = new Complex(2, 0).pow(new Complex(1, 1));
    expect(result.re).toBeCloseTo(1.5384778, 4);
  });
});